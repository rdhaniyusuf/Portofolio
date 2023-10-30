$('.portfolio-button').mousedown(function () {
    timeout = setInterval(function () {
        window.scrollBy(0, -1); // May need to be -1 to go down
    }, 0); // Play around with this number. May go too fast

    return false;
});

$(document).ready(function () {
    $('.toggle').click(function () {
        $('.menu').toggleClass('active');
    });
});

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});