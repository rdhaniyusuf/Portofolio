// Sticky Navbar

window.onscroll = () => {
	let header = document.querySelector('.header');
	header.classList.toggle('sticky', window.scrollY > 120);
};

function responsiveNavBar() {
	var x = document.getElementById("navbar");
	if (x.className === "navbar") {
		x.className += " responsive";
	} else {
		x.className = "navbar";
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const menuIcon = document.querySelector('.menu-icon');
	const navbar = document.getElementById('navbar');

	menuIcon.addEventListener('click', function () {
		if (navbar.style.display === 'block') {
			navbar.style.display = 'none';
		} else {
			navbar.style.display = 'block';
		}
	});
});