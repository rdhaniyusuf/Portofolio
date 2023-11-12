if (PerformanceNavigationTiming === 1) {
  // Page is refreshed, remove the sticky class
  let header = document.querySelector('.header');

  header.classList.remove('sticky');
}

window.onscroll = () => {
  let header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('sticky');

  } else {
    header.classList.remove('sticky');
  }
};
// /**
//  * navbar toggle
//  */

const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', function () {
  navbar.classList.toggle('active');
});

// Get all the navbar items
const sections = document.querySelectorAll('section');
const navbarItems = document.querySelectorAll('.nav-navbar .navbar-item');

// Add scroll event listener
window.addEventListener('scroll', function () {
  let currentSection = null;

  sections.forEach(section => {
    // Calculate the position of each section
    const sectionTop = section.offsetTop - 90; // Adjust as needed
    const sectionBottom = sectionTop + section.clientHeight;

    // Check if the user has scrolled to a section
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section;
    }
  });

  // Remove the "active" class from all navbar items
  navbarItems.forEach(item => {
    item.classList.remove('active');
  });

  if (currentSection) {
    // Get the corresponding navbar item and add the "active" class
    const correspondingNavItem = document.querySelector(`a[href="#${currentSection.id}"]`);
    if (correspondingNavItem) {
      correspondingNavItem.parentElement.classList.add('active');
    }
  }
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbz1vij2gv6CNJoF8_lnphm7PReue3oqNgfwGIzmW0ItULnhG85rfIORg_pZY5pS2KiDOg/exec';
const form = document.forms['submit-message-google'];

const submitButton = document.getElementById('btn-submit');
const loadingButton = document.getElementById('btn-loading');

let submitSucces = document.querySelector('.submit-success');
let submitFail = document.querySelector('.submit-fail')

form.addEventListener('submit', e => {
  e.preventDefault();

  submitButton.style.display = "none";
  loadingButton.style.display = "flex";
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(
      response => {
        console.log('Success!', response);
        submitButton.style.display = "block";
        loadingButton.style.display = "none";
        submitSucces.classList.add('show');
        setTimeout(() => {
          submitSucces.classList.remove('show');
        }, 3000);
        form.reset();
      })
    .catch(
      error => {
        console.error('Error!', error.message)
        submitButton.style.display = "block";
        loadingButton.style.display = "none";
        submitFail.classList.add('show');
        setTimeout(() => {
          submitFail.classList.remove('show');
        }, 3000);
      })
});
