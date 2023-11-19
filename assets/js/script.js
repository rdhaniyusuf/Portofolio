if (PerformanceNavigationTiming === 1) {
  // Page is refreshed, remove the sticky class
  let header = document.querySelector('.header');

  header.classList.remove('sticky');
}

window.onscroll = () => {
  let header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.classList.add('sticky');

  } else {
    header.classList.remove('sticky');
  }
};
/**
 * navbar toggle
 */

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


// form submit 
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



$(document).ready(function () {
  $.get('./assets/txt/skill.txt', function (data) {
    const lines = data.split('\n');
    const skillList = $('.skill-list');
    const fragment = document.createDocumentFragment();

    lines.forEach(function (line) {
      const [skill, percentage] = line.split(',');
      const cleanedPercentage = percentage.trim('%');

      const skillItem = $('<li>').addClass('col-5 flex-row skill-item');
      const skillWrapper = $('<div>').addClass('col-12 flex-row skill-wrapper').css('width', percentage);

      const skillTitle = $('<h3>').addClass('sw-title').text(skill);
      const skillsData = $('<data>').addClass('sw-data').css('left', percentage)
        .attr('value', cleanedPercentage)
        .text(percentage);

      const skillBarBox = $('<div>').addClass('col-12 skill-bar-box');
      const skillBar = $('<div>').addClass('skill-bar').css('width', percentage);

      skillWrapper.append(skillTitle, skillsData);
      skillItem.append(skillWrapper, skillBarBox);
      skillBarBox.append(skillBar);
      fragment.appendChild(skillItem[0]);
    });

    skillList[0].appendChild(fragment);
  }).fail(function (error) {
    console.error('Error reading the file:', error);
  });
});

$(document).ready(function () {
  $.getJSON('./assets/txt/exp.json', function (data) {
    const expList = $('.exp-list');

    data.forEach(function (item) {
      if (item.name === "exp") {
        item.data.forEach(function (expData) {
          const expItem = $('<li>').addClass('col-12 row-col exp-item');
          const expHeader = $('<div>').addClass('col-12 ie-header');
          const expTitle = $('<h4>').text(expData.exp_title);

          const expContent = $('<div>').addClass('col-12 ie-content');
          const expJob = $('<h5>').text(expData.exp_job);
          const expDesc = $('<p>').text(expData.exp_desc);

          expHeader.append(expTitle);
          expContent.append(expJob, expDesc);
          expItem.append(expHeader, expContent);
          expList.append(expItem);
        });
      }
    });
  }).fail(function (error) {
    console.error('Error fetching JSON:', error);
  });
});


   function toggleSkillContent(expand) {
    var skillContent = document.querySelector('.skill-list');
    var buttonExpand = document.querySelector('.expand-btn');
    var buttonCollapse = document.querySelector('.collapse-btn');

    if (expand) {
      skillContent.style.maxHeight = 'none';
      skillContent.style.paddingBottom = "5%";
      buttonExpand.style.display = 'none';
      buttonCollapse.style.display = 'flex';

    } else {
      skillContent.style.maxHeight = '35vh'; // Set the desired collapsed height
      buttonExpand.style.display = 'flex';
      buttonCollapse.style.display = 'none';
      skillContent.style.paddingBottom = "0";
    }
  }
