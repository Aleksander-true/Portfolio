import { updateGreeting, updateDate, updateNamePlaceholder,  state } from "./TimeAndDate";
import { getWeather } from "./Weather";
import { getQuotes } from "./Quotes";

const userName = document.querySelector('#name');
const cityName = document.querySelector('.city');
const settings = document.querySelector('#settings');
const languages = document.querySelectorAll('.language');
const eng = document.querySelector('#en');
const rus = document.querySelector('#ru');

window.addEventListener('beforeunload', setLocalStorage)

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', cityName.value);
}

window.addEventListener('load', getLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
    cityName.value = localStorage.getItem('city');
  }
}

settings.addEventListener("click", settingsHandler)

function settingsHandler(e) {
 if (e.target.classList.contains('language')) {
  languages.forEach( lang => lang.classList.remove('active'))
  e.target.classList.add('active')
  if (e.target.classList.contains('language_eng')) {
    eng.textContent = "ENG"
    rus.textContent = "RU"
    state.language = 'en'
  } else {
    eng.textContent = "АНГ"
    rus.textContent = "РУС"
    state.language = 'ru'
  }
  updateGreeting();
  updateDate();
  getWeather(cityName.value);
  getQuotes();
  updateNamePlaceholder();
 }
}

