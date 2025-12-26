document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Check if already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '../';
    }
    
    // تأكد إن العناصر موجودة
    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // إذا errorMessage موجود، نظفه
        if (errorMessage) {
            errorMessage.textContent = '';
        }
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            if (errorMessage) {
                errorMessage.textContent = 'Username and password are required';
            } else {
                alert('Username and password are required');
            }
            return;
        }
        
        // Show loading state
        const submitBtn = loginForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Login successful
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                
                // Redirect to chat page
                window.location.href = '../';
                
            } else {
                // Login failed
                if (errorMessage) {
                    errorMessage.textContent = data.message || 'Login failed';
                } else {
                    alert(data.message || 'Login failed');
                }
            }
            
        } catch (error) {
            console.error('Login error:', error);
            if (errorMessage) {
                errorMessage.textContent = 'Network error. Please try again.';
            } else {
                alert('Network error. Please try again.');
            }
            
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});