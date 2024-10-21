const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Manage input placeholders
const handleInputFocus = (input) => {
    input.addEventListener('focus', () => (input.placeholder = ''));
    input.addEventListener('blur', () => {
        if (!input.value) input.placeholder = input.dataset.placeholder;
    });
};

usernameInput.dataset.placeholder = usernameInput.placeholder;
passwordInput.dataset.placeholder = passwordInput.placeholder;
handleInputFocus(usernameInput);
handleInputFocus(passwordInput);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.createElement('span');
         // Validate inputs
         if (username.trim() === "" || password.trim() === "") {
             errorMessage.textContent = "All fields are required.";
             errorMessage.className = "error-message";
             document.querySelector('.register-form').prepend(errorMessage);
             event.preventDefault(); // Prevent submission
             return; // Stop further execution
         }else{
            localStorage.setItem('isLoggedIn', true);
            location.replace("file:///D:/Seif/Desktop/login%20and%20register/HomePage.html")
         }
          });});