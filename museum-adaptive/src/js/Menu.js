const burgerMenu = document.querySelector('.burger-menu');
const navigation = document.querySelector('.navigation');
const welcomeSection = document.querySelector('.welcome-louvre');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  navigation.classList.toggle('open');
  welcomeSection.classList.toggle('open');
});

