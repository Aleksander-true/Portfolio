const burgerMenu = document.querySelector('.burger-menu');
const navigation = document.querySelector('.header .navigation');
const welcomeSection = document.querySelector('.welcome-louvre');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  navigation.classList.toggle('open');
  welcomeSection.classList.toggle('open');
});

welcomeSection.addEventListener('click', () => {
  burgerMenu.classList.remove('open');
  navigation.classList.remove('open');
  welcomeSection.classList.remove('open');
});
