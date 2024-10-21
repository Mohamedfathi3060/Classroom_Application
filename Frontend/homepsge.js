const sidebar = document.getElementById('sidebar');
const gridContainer = document.getElementById('gridContainer');
const toggleBtn = document.getElementById('toggleBtn');

// Generate 50 grid items dynamically
function generateGridItems() {
  for (let i = 1; i <= 50; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/150';
    img.alt = `Placeholder Image ${i}`;

    const title = document.createElement('h3');
    title.textContent = `Title ${i}`;

    const description = document.createElement('p');
    description.textContent = `Description ${i}`;

    gridItem.appendChild(img);
    gridItem.appendChild(title);
    gridItem.appendChild(description);

    gridContainer.appendChild(gridItem);
  }
}

// Toggle sidebar collapse and adjust grid columns
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  updateGridColumns();
});

function updateGridColumns() {
  const isCollapsed = sidebar.classList.contains('collapsed');
  gridContainer.style.gridTemplateColumns = isCollapsed
    ? 'repeat(4, 1fr)'
    : 'repeat(3, 1fr)';
}

// Set initial grid columns and generate grid items
updateGridColumns();
generateGridItems();


document.addEventListener("DOMContentLoaded", function() {
// Check if user is logged in (simple example using localStorage)
let isLoggedIn = localStorage.getItem('isLoggedIn');

const loginModal = document.getElementById('loginModal');
const gridContainer = document.getElementsByClassName('main-content')[0];
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const signOutBtn = document.getElementById('signOutBtn');

// If user is not logged in, show the modal
if (!isLoggedIn) {
  loginModal.classList.add('show');
}

// Simulate login on button click
loginBtn.addEventListener('click', function() {
  // localStorage.setItem('isLoggedIn', true);
  // loginModal.classList.remove('show');
  location.replace("file:///D:/Seif/Desktop/login%20and%20register/login-1.html")
});

// Simulate register on button click (for demonstration purposes)
registerBtn.addEventListener('click', function() {
  location.replace("file:///D:/Seif/Desktop/login%20and%20register/register.html")
});
// Handle sign-out on button click
signOutBtn.addEventListener('click', function() {
  // Remove the logged-in status
  alert('Redirect to Register Page');
  localStorage.removeItem('isLoggedIn');
  // Redirect to login page or refresh the current page to show the login modal again
  window.location.reload(); // Refresh page to show login modal again
});
});
// Handle submenu item icons (on page load)
document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('.submenu-item').forEach(function (item) {
const titleElement = item.querySelector('.submenu-title');
const iconElement = item.querySelector('.submenu-icon');

// Make sure both title and icon elements exist
if (titleElement && iconElement) {
  const title = titleElement.textContent.trim();
  if (title.length > 0) {
    iconElement.textContent = title.charAt(0).toUpperCase(); // Get the first letter of the title
  }
}
});
});
document.addEventListener('DOMContentLoaded', function () {
const colors = ['green', 'blue', 'red', 'cyan', 'magenta', 'yellow'];
const classImageDivs = document.getElementsByClassName('class-image'); 

// Helper function to get a random color
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Loop through each .class-image div
for (let i = 0; i < classImageDivs.length; i++) {
  const classImage = classImageDivs[i];
  const storageKey = `class-image-color-${i}`; // Unique key for each image

  // Check if a color is already stored in localStorage
  let savedColor = localStorage.getItem(storageKey);

  if (!savedColor) {
      // If no saved color, generate one and store it
      savedColor = getRandomColor();
      localStorage.setItem(storageKey, savedColor);
  }

  // Apply the saved or new color
  classImage.style.backgroundColor = savedColor;
}
});
// Selecting elements
const profilePic = document.querySelector('.accpfp');
const dropdown = document.getElementById('profileDropdown');
const plusIcons = document.querySelectorAll('.plus-icon');
const dropdownPlus = document.getElementById('plus-iconDropdown');

// Toggle profile picture dropdown
profilePic.addEventListener('click', function (event) {
event.stopPropagation(); // Prevent event bubbling
toggleVisibility(dropdown);
dropdownPlus.style.display = 'none'; // Ensure plus icon dropdown is hidden
});

// Toggle plus icon dropdown
plusIcons.forEach(icon => {
icon.addEventListener('click', function (event) {
  event.stopPropagation(); // Prevent event bubbling
  toggleVisibility(dropdownPlus);
  dropdown.style.display = 'none'; // Ensure profile picture dropdown is hidden
});
});

// Close both dropdowns when clicking outside
document.addEventListener('click', function (event) {
if (!dropdown.contains(event.target) && !profilePic.contains(event.target)) {
  dropdown.style.display = 'none';
}
if (!dropdownPlus.contains(event.target) && !event.target.closest('.plus-icon')) {
  dropdownPlus.style.display = 'none';
}
});

// Prevent dropdowns from closing when clicking inside them
dropdown.addEventListener('click', event => event.stopPropagation());
dropdownPlus.addEventListener('click', event => event.stopPropagation());

// Helper function to toggle dropdown visibility
function toggleVisibility(element) {
element.style.display = element.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", function() {
  // Automatically start with the sidebar collapsed
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('collapsed');
  teacherIcon.style.transform = 'rotate(0deg)';
  enrolledSubmenu.classList.remove('open');
  enrolledIcon.style.transform = 'rotate(0deg)';
});
let hoverTimeout;
let isToggledOpen = false; // To track if sidebar was opened by toggle button

// Expand the sidebar on hover
sidebar.addEventListener('mouseenter', () => {
  if (!isToggledOpen) {
      hoverTimeout = setTimeout(() => {
          sidebar.classList.add('open');
          sidebar.classList.remove('collapsed');
      }, 150); // 150ms delay
  }
});

// Collapse the sidebar when the cursor leaves the entire sidebar
sidebar.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimeout); // Clear timeout if the cursor leaves early
  if (!isToggledOpen) {
      // Reset submenus
      teacherSubmenu.classList.remove('open');
      teacherIcon.style.transform = 'rotate(0deg)';
      
      enrolledSubmenu.classList.remove('open');
      enrolledIcon.style.transform = 'rotate(0deg)';

      sidebar.classList.add('collapsed');
      sidebar.classList.remove('open');
  }
});


const teacherHeader = document.querySelector('.sidebar-header-teacher');
const teacherIcon = teacherHeader.querySelector('.collapsable-icon');
const teacherSubmenu = teacherHeader.nextElementSibling; // Submenu after the header
const enrolledHeader = document.querySelector('.sidebar-header-enrolled');
const enrolledIcon = enrolledHeader.querySelector('.collapsable-icon');
const enrolledSubmenu = enrolledHeader.nextElementSibling; // Submenu after the header

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const gridContainer = document.getElementById('gridContainer');
  
// Toggle sidebar on button click
document.getElementById('toggleBtn').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
sidebar.classList.toggle('collapsed');
isToggledOpen = !sidebar.classList.contains('collapsed'); // Update based on current state
gridContainer.classList.toggle('shifted');
this.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✖';
// If the sidebar is collapsed, close all submenus and reset icon rotations
if (sidebar.classList.contains('collapsed')) {
  // Reset teacher submenu
  teacherSubmenu.classList.remove('open');
  teacherIcon.style.transform = 'rotate(0deg)';

  // Reset enrolled submenu
  enrolledSubmenu.classList.remove('open');
  enrolledIcon.style.transform = 'rotate(0deg)';
}
});
});
// Toggle submenu visibility and rotate icon on "Teaching" header click
teacherHeader.addEventListener('click', () => {
if (sidebar.classList.contains('collapsed')) return; // Prevent toggle if sidebar is collapsed

teacherSubmenu.classList.toggle('open');
teacherIcon.style.transform = teacherSubmenu.classList.contains('open')
? 'rotate(90deg)'
: 'rotate(0deg)';
});

// Toggle submenu visibility and rotate icon on "Enrolled" header click
enrolledHeader.addEventListener('click', () => {
if (sidebar.classList.contains('collapsed')) return; // Prevent toggle if sidebar is collapsed

enrolledSubmenu.classList.toggle('open');
enrolledIcon.style.transform = enrolledSubmenu.classList.contains('open')
? 'rotate(90deg)'
: 'rotate(0deg)';
});
