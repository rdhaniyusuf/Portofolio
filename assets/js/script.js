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