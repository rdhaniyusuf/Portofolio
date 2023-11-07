// Sticky Navbar
if (performance.navigation.type === 1) {
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

// navbar Responsive
document.addEventListener('DOMContentLoaded', function () {
	const menuIcon = document.querySelector('.menu-icon');
	const navbar = document.getElementById('navbar');
	const maxScreenWidth = 768;

	menuIcon.addEventListener('click', function () {
		if (navbar.style.display === 'flex') {
			navbar.style.display = 'none';
		} else {
			navbar.style.display = 'flex';
		}
	});

	function handleScreenWidthChange() {
		if (window.innerWidth <= maxScreenWidth) {
			navbar.style.display = 'none';
		} else {
			navbar.style.display = 'flex';
		}
	}


	if (window.matchMedia('(max-width: 768px)').matches) {
		window.addEventListener('scroll', function () {
			navbar.style.display = 'none';
		});
	}
	
	handleScreenWidthChange();
	window.addEventListener('resize', handleScreenWidthChange);
});

