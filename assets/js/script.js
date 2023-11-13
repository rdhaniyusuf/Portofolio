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

const blurMain = document.querySelector('main')

// Function to toggle the blur effect on the main content
function toggleBlur() {
  blurMain.classList.toggle('blured');
}

function hideMenu() {
  navbar.classList.remove('active');
  blurMain.classList.remove('blured');
}


navToggle.addEventListener('click', function () {
  navbar.classList.toggle('active');
  toggleBlur()
});


const sections = document.querySelectorAll('section');
const navbarItems = document.querySelectorAll('.nav-navbar .navbar-item');

navbarItems.forEach(item => {
  item.addEventListener('click', hideMenu);
});

window.addEventListener('scroll', function () {
  let currentSection = null;

  sections.forEach(sections => {

    const sectionTop = sections.offsetTop - 90;
    const sectionBottom = sectionTop + sections.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = sections;
    }
  });

  navbarItems.forEach(item => {
    item.classList.remove('active');
  });

  if (currentSection) {
    const correspondingNavItem = document.querySelector(`a[href="#${currentSection.id}"]`);
    if (correspondingNavItem) {
      correspondingNavItem.parentElement.classList.add('active');
    }
  }

  hideMenu();
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
