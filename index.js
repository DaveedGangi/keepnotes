document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formContainer = document.getElementById('formContainer');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const showLoginForm = document.getElementById('showLoginForm');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');

    showRegisterForm.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });

    showLoginForm.addEventListener('click', function (e) {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    loginForm.addEventListener('submit',async function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const userdata={
            username: username,
            password: password
        };

       await fetch('https://notes-2-wrxv.onrender.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
        .then(response => response.json())
        .then(data => {
            
            
            if (!data.errorMessage) {
                console.log("hello")
                
                window.location.href = 'home.html'; // Navigate to home page on success
            } else {
                loginErrorMessage.textContent = data.errorMessage; // Display error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginErrorMessage.textContent = 'An error occurred. Please try again.';
        });
    });

    registerForm.addEventListener('submit',async function (event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            registerErrorMessage.textContent = 'Passwords do not match.';
            return;
        }

        const userdata={
            username: username,
            password: password
        };

       await fetch('https://notes-2-wrxv.onrender.com/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
        .then(response => response.json())
        .then(data => {
            if (!data.errorMessage) {
               console.log("home");

                
                window.location.href = 'home.html'; // Navigate to home page on success
            } else {
               
                registerErrorMessage.textContent = data.errorMessage; // Display error message
            }
        })
        .catch(error => {
          
            
            registerErrorMessage.textContent = "An error occurred. Please try again.";
        });
    });
});
