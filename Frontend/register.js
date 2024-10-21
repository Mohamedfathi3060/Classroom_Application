
// Manage input fields
const firstNameInput = document.querySelector('input[placeholder="First Name"]');
const emailInput = document.querySelector('input[placeholder="E-mail"]');
const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');

// Function to handle input placeholders
const handleInputFocus = (input) => {
    input.addEventListener('focus', () => (input.placeholder = ''));
    input.addEventListener('blur', () => {
        if (!input.value) input.placeholder = input.dataset.placeholder;
    });
};

// Set data placeholders for inputs
firstNameInput.dataset.placeholder = firstNameInput.placeholder;
emailInput.dataset.placeholder = emailInput.placeholder;
lastNameInput.dataset.placeholder = lastNameInput.placeholder;
passwordInput.dataset.placeholder = passwordInput.placeholder;
confirmPasswordInput.dataset.placeholder = confirmPasswordInput.placeholder;

// Attach focus handlers to all inputs
[firstNameInput, emailInput, lastNameInput, passwordInput, confirmPasswordInput].forEach(handleInputFocus);

   
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
            const firstName = document.getElementById("firstName").value;
        const email = document.getElementById("email").value;
        const lastName = document.getElementById("lastName").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const errorMessage = document.createElement('span');
         // Validate inputs
         if (firstName.trim() === "" || email.trim() === "" || lastName.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
             errorMessage.textContent = "All fields are required.";
             errorMessage.className = "error-message";
             document.querySelector('.register-form').prepend(errorMessage);
             event.preventDefault(); // Prevent submission
             return; // Stop further execution
         } 
         else if (password !== confirmPassword) {
             errorMessage.textContent = "Passwords do not match.";
             errorMessage.className = "error-message";
             document.querySelector('.register-form').prepend(errorMessage);
             event.preventDefault(); // Prevent submission
             return; // Stop further execution
         }else{
            localStorage.setItem('isLoggedIn', true);
            location.replace("file:///D:/Seif/Desktop/login%20and%20register/HomePage.html")
         }
          });});