const userName = document.querySelector('#name');
const cityName = document.querySelector('.city');

window.addEventListener('beforeunload', setLocalStorage)

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  //localStorage.setItem('city', cityName.value);

}

window.addEventListener('load', getLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
    //cityName.value = localStorage.getItem('city');
  }
}
