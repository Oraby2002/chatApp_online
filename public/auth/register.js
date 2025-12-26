document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset messages
        errorMessage.textContent = '';
        successMessage.textContent = '';
        
        // Get form values
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!username || !password || !confirmPassword) {
            errorMessage.textContent = 'All fields are required';
            return;
        }
        
        if (username.length < 3) {
            errorMessage.textContent = 'Username must be at least 3 characters';
            return;
        }
        
        if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters';
            return;
        }
        
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match';
            return;
        }
        
        // Show loading state
        const submitBtn = registerForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        try {
            // Send registration request
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email || null,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Registration successful
                successMessage.textContent = 'Account created successfully! Redirecting to login...';
                errorMessage.textContent = '';
                
                // Auto-redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                
            } else {
                // Registration failed
                errorMessage.textContent = data.message || 'Registration failed';
            }
            
        } catch (error) {
            console.error('Registration error:', error);
            errorMessage.textContent = 'Network error. Please try again.';
            
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Real-time password validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    function validatePasswords() {
        if (passwordInput.value && confirmPasswordInput.value) {
            if (passwordInput.value !== confirmPasswordInput.value) {
                errorMessage.textContent = 'Passwords do not match';
            } else {
                errorMessage.textContent = '';
            }
        }
    }
    
    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // If already logged in, redirect to chat
        window.location.href = '../';
    }
});