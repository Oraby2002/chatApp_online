# 💬 Real-Time Chat Application

A full-featured **real-time chat application** built with modern web technologies, featuring secure authentication, live messaging, and a clean, responsive user interface.

---

## ✨ Features

- 🔐 **JWT Authentication** (Register & Login)
- 🔒 **Secure password hashing** using bcrypt
- 💬 **Real-time messaging** with Socket.IO
- 👥 **Live online users list**
- 🎨 **Responsive UI** (Desktop & Mobile)
- ⚡ **Fast & scalable** architecture
- 📦 Clean project structure (MVC pattern)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB Atlas
- JWT Authentication
- bcrypt

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap

### Real-Time
- WebSockets (Socket.IO)

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

---

### 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
````

2. **Install dependencies**

```bash
npm install
```

3. **Environment configuration**

```bash
cp .env.example .env
```

Edit the `.env` file with your own credentials.

4. **Start the server**

```bash
npm run dev
```

5. **Open in browser**

```
http://localhost:5000
```

---

## 📁 Project Structure

```text
chat-app/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── user.js
│   ├── routers/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── auth_middleware.js
│   └── socket/
│       └── chat.socket.js
│
├── public/
│   ├── auth/
│   ├── css/
│   ├── js/
│   └── myChat.html
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

---

## 📡 API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### WebSocket

* Real-time chat using Socket.IO

---

## 🧠 Authentication Flow

1. User registers with username & password
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Token & username stored in localStorage
5. Protected routes use JWT middleware

---

## 👨‍💻 Author

**Eng. Mahmoud Samir Oraby**
Full Stack Developer (Node.js)

⭐ Feel free to fork, star, or contribute

