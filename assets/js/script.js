document.addEventListener("DOMContentLoaded", function () {
  // // set theme asli
  var htmlElement = document.querySelector('html');
  var themeInHTML = htmlElement.getAttribute('d-theme');
  var defaultTheme = "auto";
  var localThemeUser = localStorage.getItem("userTheme");

  var checkboxTheme = document.getElementById("input-theme");
  let setToTheme = "";

  if (themeInHTML == defaultTheme) {
    let prefersDarkMode = window.matchMedia('(prefers-color-scheme : dark)').matches;
    setToTheme = prefersDarkMode ? "dark" : "light";
  } else {
    setToTheme = themeInHTML
  }

  if (localThemeUser != null){
      htmlElement.setAttribute('d-theme', localThemeUser);
      setToTheme = localThemeUser
  } else {
      htmlElement.setAttribute('d-theme', setToTheme)
  }

  
  if (setToTheme == 'light'){
    checkboxTheme.checked = false;
  } else {
    checkboxTheme.checked = true;
  }

  checkboxTheme.addEventListener("change", function(){
    var isChecked = checkboxTheme.checked
    setToTheme = isChecked ? "dark" : "light";
    htmlElement.setAttribute('d-theme', setToTheme)
    localStorage.setItem("userTheme", setToTheme)
  })

  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  function highlightNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - section.style.scrollMarginTop;
      const sectionBottom = sectionTop + section.offsetHeight + section.style.marginBottom;

      // Adjusting the condition to check if the top of the section is within the view
      const isSectionPartiallyVisible = (scrollPosition >= sectionTop - 6 * parseFloat(getComputedStyle(document.documentElement).fontSize) && scrollPosition < sectionBottom);

      if (isSectionPartiallyVisible) {
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });
        navLinks[index].classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);



  // Handle navigation link clicks to scroll smoothly to the target section
  navLinks.forEach((navLink, index) => {
    navLink.addEventListener('click', function (event) {
      event.preventDefault();

      // Get the target section ID from the href attribute
      const targetSectionId = this.querySelector('a').getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetSectionId);

      // Scroll smoothly to the target section
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // Manually trigger the scroll event to update the active navigation link
      setTimeout(() => {
        highlightNavLink();
      }, 800); // Adjust the timeout based on your smooth scroll duration
    });
  });

});


// Attach the scroll event listener

function handleHover(card) {
  document.querySelectorAll('[class$="-card"]').forEach(function (element) {
    if (element == card) {
      card.style.opacity = 1;
    }
  });
}

function resetOpacity() {
  document.querySelectorAll('[class$="-card"]').forEach(function (element) {
    element.style.opacity = 0.5;
    element.style.transition = ".25s ease-out all";
  });
}

// dark theme
// var checkbox = document.getElementById("input-theme");

// checkbox.addEventListener("change", function () {
//   var isChecked = checkbox.checked;
//   var htmlElement = document.querySelector("html");

//   htmlElement.setAttribute('d-theme', isChecked ? 'dark' : "light")

// })

// form submit 
const scriptURL = 'https://script.google.com/macros/s/AKfycbz1vij2gv6CNJoF8_lnphm7PReue3oqNgfwGIzmW0ItULnhG85rfIORg_pZY5pS2KiDOg/exec';
const form = document.forms['submit-message-google'];
const submitButton = document.querySelector('.btn-submit');
const loadingButton = document.querySelector('.btn-loading');

let submitSucces = document.querySelector('.alert-success');
let submitFail = document.querySelector('.alert-fail')

form.addEventListener('submit', e => {
  e.preventDefault();

  submitButton.style.display = "none";
  loadingButton.style.display = "flex";
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(
      response => {
        submitSucces.style.display = "flex";
        console.log('Success!', response);
        submitButton.style.display = "flex";
        loadingButton.style.display = "none";
        setTimeout(() => {
          submitSucces.style.display = "none";

        }, 3000);
        form.reset();
      })
    .catch(
      error => {
        submitFail.style.display = "flex";
        console.error('Error!', error.message)
        submitButton.style.display = "flex";
        loadingButton.style.display = "none";
        setTimeout(() => {
          submitFail.style.display = "none";
        }, 3000);
      })
});

// document.addEventListener("DOMContentLoaded", function () {
//   const skillItemNav = document.querySelectorAll('.skill-nav-item');
//   skillItemNav[0].classList.add('skill-active');
//   changeSkills(skillItemNav[0].getAttribute('name'))

//   skillItemNav.forEach((link, index) => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();

//       const nameString = this.getAttribute('name');
//       this.classList.add('skill-active');

//       skillItemNav.forEach((otherLink, otherIndex) => {
//         if (otherIndex != index) {
//           otherLink.classList.remove("skill-active")
//         }
//       });
//       changeSkills(nameString)
//     });
//   });
// });


// function changeSkills(nameString) {
//   console.log(nameString)
// }
