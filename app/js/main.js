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
