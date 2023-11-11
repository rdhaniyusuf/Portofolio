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

// const header = document.querySelector("[nav-navbar]");
// const navToggleBtn = document.querySelector("[nav-toggle]");

// navToggleBtn.addEventListener("click", function () {
//   header.classList.toggle("nav-active");
//   this.classList.toggle("active");
// });

// /**
//  * toggle the navbar when click any navbar link
//  */

// const navbarLinks = document.querySelectorAll("[navbar-item]");

// for (let i = 0; i < navbarLinks.length; i++) {
//   navbarLinks[i].addEventListener("click", function () {
//     header.classList.toggle("nav-active");
//     navToggleBtn.classList.toggle("active");
//   });
// }
