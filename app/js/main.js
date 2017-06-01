// Show dropdown menu
var menuToggle = document.querySelector('.location__link');
var dropMenu = document.querySelector('.location__dropdown');

menuToggle.addEventListener('click', function(e) {
  dropMenu.classList.toggle('location__dropdown--show');
  e.preventDefault();
});

// ​Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.location__link')) {
    if (dropMenu.classList.contains('location__dropdown--show')) {
      dropMenu.classList.remove('location__dropdown--show');
    }
  }
};

// bxSlider settings
$('.slider__list').bxSlider({
  minSlides: 7,
  maxSlides: 7,
  slideWidth: 50,
  slideMargin: 10
});

// Mixitup
var containerEl = document.querySelector('.catalog__list');
var mixer = mixitup(containerEl, {
  selectors: {
    target: '.catalog__item'
  }
});
