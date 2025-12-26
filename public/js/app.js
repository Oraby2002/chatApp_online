const socket = io({
    auth: {
        token: localStorage.getItem("token")
    }
});

const username = localStorage.getItem("username");
if (!username) window.location.href = "/auth/login.html";

document.getElementById("currentUser").innerText = username;

let selectedUser = null;
let selectedUserName = "";  


socket.on("users", (users) => {
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    
    for (const id in users) {
        if (users[id] === username) continue;

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="user-avatar">
                <i class="bi bi-person"></i>
                <span class="online-dot"></span>
            </div>
            <span>${users[id]}</span>
        `;

        li.onclick = () => {
            selectedUser = id;
             selectedUserName = users[id]; 
            document.getElementById("chatBox").innerHTML = "";
            document.getElementById("chatHeader").innerText = users[id];
            document.querySelectorAll("#usersList li").forEach(el => el.classList.remove("active"));
            li.classList.add("active");
        };

        usersList.appendChild(li);
    }
});

function addMessage(from, message, isMe = false) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isMe ? 'me' : ''}`;
    
    messageDiv.innerHTML = `
        <div class="message-sender">${from}</div>
        <div class="message-content">${message}</div>
    `;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

socket.on("message", (data) => {
    addMessage(data.from, data.message);
});

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    
    if (!selectedUser) {
        alert("Please select a user to chat with!");
        return;
    }
    
    if (!message) return;
    
    socket.emit("privateMessage", {
        to: selectedUser,
        message: message
    });
    
    addMessage("You", message, true);
    
    messageInput.value = "";
    messageInput.focus();
}

document.getElementById("messageInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});


function filterUsers() {
    const term = document.getElementById("searchUser").value.toLowerCase();
    document.querySelectorAll("#usersList li").forEach(user => {
        const username = user.innerText.toLowerCase();
        user.style.display = username.includes(term) ? "flex" : "none";
    });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/auth/login.html";
}