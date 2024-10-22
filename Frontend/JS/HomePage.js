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
      let isToggledOpen = false;  // Define this to avoid reference errors
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
          let storedImage = localStorage.getItem(`grid-img-${index}`);
          if (!storedImage) {
              const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
              localStorage.setItem(`grid-img-${index}`, randomImage);
              storedImage = randomImage;
          }
          return storedImage;
      }
  
      function updateGridColumns() {
          const isCollapsed = sidebar.classList.contains('collapsed');
          gridContainer.style.gridTemplateColumns = isCollapsed ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)';
      }
  
      function checkForNoCourses() {
          if (gridContainer.children.length === 0) {
              const noCoursesMessage = document.createElement('div');
              noCoursesMessage.classList.add('no-courses');
              noCoursesMessage.innerHTML = '<br><br><br><br><br><br><br><br><br>No courses available<br>Join or create a class';
              gridContainer.appendChild(noCoursesMessage);
          } else {
              const existingMessage = document.querySelector('.no-courses');
              if (existingMessage) {
                  gridContainer.removeChild(existingMessage);
              }
          }
      }
  
      function generateGridItems() {
          const numberOfItems = 50; 
          const titles = []; 
  
          for (let i = 1; i <= numberOfItems; i++) {
              const gridItem = document.createElement('div');
              gridItem.classList.add('grid-item');
  
              const img = document.createElement('img');
              img.src = getOrGenerateImage(i); 
              img.alt = `Placeholder Image ${i}`;
                // Add click event to title for redirection
                img.addEventListener('click', () => {
                  window.location.href = '../HTML/CoursePage.html';
              });     
              const titleElement = `Title ${i}`; 
              titles.push(titleElement); 
              const title = document.createElement('h3');
              title.textContent = titleElement;
                // Add click event to title for redirection
                title.addEventListener('click', () => {
                  window.location.href = '../HTML/CoursePage.html';
              });      
              const description = document.createElement('p');
              description.textContent = `Description ${i}`;
  
              gridItem.appendChild(img);
              gridItem.appendChild(title);
              gridItem.appendChild(description);
  
              gridContainer.appendChild(gridItem);
          }
          generateSubmenuItems(titles);
          checkForNoCourses();
      }
  
      // Function to generate submenu items based on titles
function generateSubmenuItems(titles) {
  const submenuTeacherContainer = sidebar.querySelector('.submenu-teacher'); // Get the teacher submenu container
  const submenuEnrolledContainer = sidebar.querySelector('.submenu-enrolled'); // Get the enrolled submenu container

  // Clear existing submenu items
  submenuTeacherContainer.innerHTML = '';
  submenuEnrolledContainer.innerHTML = '';

  // Condition to distribute titles (e.g., odd goes to teacher, even goes to enrolled)
  titles.forEach((title, index) => {
      const submenuItem = document.createElement('div');
      submenuItem.classList.add('submenu-item');
      //Add click event to submenu title for redirection
      submenuItem.addEventListener('click', () => {
        window.location.href = '../HTML/CoursePage.html';
      });
      const submenuIcon = document.createElement('div');
      submenuIcon.classList.add('submenu-icon');

      const submenuTitle = document.createElement('div');
      submenuTitle.classList.add('submenu-title');
      submenuTitle.textContent = title; // Set title

      submenuItem.appendChild(submenuIcon);
      submenuItem.appendChild(submenuTitle);

      // Conditional: Place in teacher or enrolled based on index (odd/even)
      if (index % 2 === 0) {
          // Even index goes to submenu-teacher
          submenuTeacherContainer.appendChild(submenuItem);
      } else {
          // Odd index goes to submenu-enrolled
          submenuEnrolledContainer.appendChild(submenuItem);
      }
  });
}

  
      sidebar.classList.add('collapsed');
      updateGridColumns();
  
      toggleBtn.addEventListener('click', function () {
          sidebar.classList.toggle('collapsed');
          updateGridColumns();
  
          isToggledOpen = !sidebar.classList.contains('collapsed');
          this.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✖';
      });
  
      sidebar.addEventListener('mouseenter', () => {
          if (!isToggledOpen) {
              hoverTimeout = setTimeout(() => {
                  sidebar.classList.remove('collapsed');
                  updateGridColumns();
              }, 150);
          }
      });
  
      sidebar.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          if (!isToggledOpen) {
              sidebar.classList.add('collapsed');
              updateGridColumns();
          }
      });
  
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
