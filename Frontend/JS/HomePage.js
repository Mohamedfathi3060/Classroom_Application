document.addEventListener("DOMContentLoaded", function () {
  const profilePicture = document.getElementById('profilePicture');
  const gridContainer = document.getElementById('gridContainer');
  const defaultImage = "../Images/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg";

  // Load the saved image or default
  const savedImage = localStorage.getItem('profileImage') || defaultImage;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  profilePicture.src = isLoggedIn ? savedImage:defaultImage;
  gridContainer.style.display = isLoggedIn ? 'grid' : 'none';
});
// Get modal elements
var joinClassModal = document.getElementById("joinClassModal");
var createClassModal = document.getElementById("createClassModal");

// Get buttons that open the modals
var joinClassBtn = document.getElementById("joinClassBtn");
var createClassBtn = document.getElementById("createClassBtn");

// Get the <span> elements that close the modals
var closeJoinClass = document.getElementById("closeJoinClass");
var closeCreateClass = document.getElementById("closeCreateClass");

// Open Join Class modal
joinClassBtn.onclick = function() {
    joinClassModal.classList.add("show");
}

// Open Create Class modal
createClassBtn.onclick = function() {
    createClassModal.classList.add("show");
}

// Close Join Class modal
closeJoinClass.onclick = function() {
    joinClassModal.classList.remove("show");
}

// Close Create Class modal
closeCreateClass.onclick = function() {
    createClassModal.classList.remove("show");
}

// Close modals if clicked outside
window.onclick = function(event) {
    if (event.target == joinClassModal) {
        joinClassModal.classList.remove("show");
    }
    if (event.target == createClassModal) {
        createClassModal.classList.remove("show");
    }
}

document.addEventListener("DOMContentLoaded", function() {
  // Automatically start with the sidebar collapsed
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('collapsed');
  teacherIcon.style.transform = 'rotate(0deg)';
  enrolledSubmenu.classList.remove('open');
  enrolledIcon.style.transform = 'rotate(0deg)';
});
const sidebar = document.getElementById('sidebar');
    const gridContainer = document.getElementById('gridContainer');
    const toggleBtn = document.getElementById('toggleBtn');

    let hoverTimeout;
    let isToggledOpen = false; // To track if sidebar was opened by toggle button

    // Function to generate 50 grid items dynamically
 document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById('gridContainer');
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    let hoverTimeout;
    let isToggledOpen = false;

    // Function to update grid columns based on the sidebar collapse state
    function updateGridColumns() {
        const isCollapsed = sidebar.classList.contains('collapsed');
        gridContainer.style.gridTemplateColumns = isCollapsed
            ? 'repeat(4, 1fr)' // 4 columns when collapsed
            : 'repeat(3, 1fr)'; // 3 columns when expanded
    }

    function checkForNoCourses() {
      // If no children are present in the grid container
      if (gridContainer.children.length === 0) {
          const noCoursesMessage = document.createElement('div');
          noCoursesMessage.classList.add('no-courses');
  
          // Create and append text with <br> elements
          noCoursesMessage.innerHTML = '<br><br><br><br><br><br><br><br><br>No courses available<br>Join or create a class';
  
          gridContainer.appendChild(noCoursesMessage);
      } else {
          const existingMessage = document.querySelector('.no-courses');
          if (existingMessage) {
              gridContainer.removeChild(existingMessage);
          }
      }
  }
  
  const imagePaths = [
    "../Images/Honors.jpg",
    "../Images/img_backtoschool.jpg",
    "../Images/img_bookclub.jpg",
    "../Images/img_code.jpg",
    "../Images/img_graduation.jpg",
    "../Images/img_learnlanguage.jpg",
    "../Images/img_reachout.jpg",
    "../Images/img_read.jpg"
  ];
  
  function getOrGenerateImage(index) {
    // Check if there's already an assigned image for this index
    let storedImage = localStorage.getItem(`grid-img-${index}`);
    
    if (!storedImage) {
      // Generate a random image path
      const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
      localStorage.setItem(`grid-img-${index}`, randomImage); // Store it
      storedImage = randomImage;
    }
  
    return storedImage;
  }
    // Function to generate grid items dynamically
    function generateGridItems() {
        // Example: Adjust the number of items to test the "no courses" scenario
        const numberOfItems = 50; // Set to 0 to trigger "No courses" message
        
        for (let i = 1; i <= numberOfItems; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const img = document.createElement('img');
            img.src = getOrGenerateImage(i); // Use the random image
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

        // After generating grid items, check if there are no courses
        checkForNoCourses();
    }

    // Automatically start with the sidebar collapsed
    sidebar.classList.add('collapsed');
    updateGridColumns(); // Set grid to 4 columns initially since the sidebar is collapsed

    // Toggle sidebar on button click
    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        updateGridColumns(); // Update grid columns on toggle

        isToggledOpen = !sidebar.classList.contains('collapsed');
        this.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✖';
    });

    // Expand the sidebar on hover
    sidebar.addEventListener('mouseenter', () => {
        if (!isToggledOpen) {
            hoverTimeout = setTimeout(() => {
                sidebar.classList.remove('collapsed');
                updateGridColumns(); // Update grid columns on hover
            }, 150); // 150ms delay
        }
    });

    // Collapse the sidebar when the cursor leaves
    sidebar.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout); // Clear timeout if the cursor leaves early
        if (!isToggledOpen) {
            sidebar.classList.add('collapsed');
            updateGridColumns(); // Update grid columns on leave
        }
    });
    // Set initial grid columns and generate grid items
    generateGridItems();
});

document.addEventListener("DOMContentLoaded", function() {
// Check if user is logged in (simple example using localStorage)
let isLoggedIn = localStorage.getItem('isLoggedIn');

const loginModal = document.getElementById('loginModal');
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
  location.replace("../HTML/Login.html")
});

// Simulate register on button click (for demonstration purposes)
registerBtn.addEventListener('click', function() {
  location.replace("../HTML/Register.html")
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



const teacherHeader = document.querySelector('.sidebar-header-teacher');
const teacherIcon = teacherHeader.querySelector('.collapsable-icon');
const teacherSubmenu = teacherHeader.nextElementSibling; // Submenu after the header
const enrolledHeader = document.querySelector('.sidebar-header-enrolled');
const enrolledIcon = enrolledHeader.querySelector('.collapsable-icon');
const enrolledSubmenu = enrolledHeader.nextElementSibling; // Submenu after the header

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
