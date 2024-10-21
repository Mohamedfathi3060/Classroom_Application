document.getElementById("profilePicture").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Manage input fields
const firstNameInput = document.querySelector('input[placeholder="First Name"]');
const emailInput = document.querySelector('input[placeholder="E-mail"]');
const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');

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

// Attach focus handlers to all inputs
[firstNameInput, emailInput, lastNameInput, passwordInput].forEach(handleInputFocus);
// Profile picture upload and preview logic
const profilePictureInput = document.getElementById("profilePicture");
const profileImage = document.getElementById("profileImage");
const imagePreview = document.getElementById("imagePreview");
const cropModal = document.getElementById("cropModal");
const cropButton = document.getElementById("cropButton");
const cancelButton = document.getElementById("cancelButton");
let cropper;

// Load saved image from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem("profileImage");
    profileImage.src = savedImage || "default-profile.png";
});

// Open file selector when clicking the profile image
profileImage.addEventListener("click", () => profilePictureInput.click());

// Handle image file selection
profilePictureInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            cropModal.style.display = 'block'; // Show the crop modal

            // Initialize or reinitialize cropper
            cropper?.destroy();
            cropper = new Cropper(imagePreview, {
                aspectRatio: 1,
                viewMode: 1,
                movable: true,
                zoomable: true,
                cropBoxResizable: true,
            });

            toggleBlur(true); // Apply blur to the background
        };
        reader.readAsDataURL(file);
    }
});

// Handle crop action
cropButton.addEventListener("click", () => {
    const canvas = cropper.getCroppedCanvas({ width: 150, height: 150 });
    const croppedImage = canvas.toDataURL();

    profileImage.src = croppedImage;
    localStorage.setItem("profileImage", croppedImage);

    closeModal();
});

// Handle cancel action
cancelButton.addEventListener("click", closeModal);

// Close modal and remove blur
function closeModal() {
    cropper?.destroy();
    profileImage.src = localStorage.getItem("profileImage");
    cropModal.style.display = 'none';
    toggleBlur(false); // Remove blur from the background
}

// Toggle blur effect (ignores the crop modal)
const mainContent = document.querySelector('.main-content');
function toggleBlur(isBlurred) {
    mainContent.querySelectorAll(':scope > *:not(#cropModal)').forEach((el) => {
        el.style.filter = isBlurred ? 'blur(15px)' : 'none';
        el.style.pointerEvents = isBlurred ? 'none' : 'auto';
    });
}

// Manage input placeholders (reusable logic)
document.querySelectorAll('input[placeholder]').forEach(input => {
    const originalPlaceholder = input.placeholder;
    input.dataset.placeholder = originalPlaceholder;

    input.addEventListener('focus', () => input.placeholder = '');
    input.addEventListener('blur', () => {
        if (!input.value) input.placeholder = originalPlaceholder;
    });
});
function goBackAndRefresh(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    
    // Check if the previous page is the same as the current page
    if (document.referrer && document.referrer === window.location.href && document.referrer === null) {
        // Redirect to HomePage.html if the previous page is the same
        window.location.href = "HomePage.html";
    } else {
        // Otherwise, go back and refresh the previous page
        history.back();
        setTimeout(() => {
            location.reload();
        }, 100);
    }
}