import { updateGreeting, updateDate, updateNamePlaceholder,  state } from "./TimeAndDate";
import { getWeather } from "./Weather";
import { getQuotes } from "./Quotes";
import { getLinks } from "./BackgroundImg";

const userName = document.querySelector('#name');
const cityName = document.querySelector('.city');
const settings = document.querySelector('#settings');

const eng = document.querySelector('#en');
const rus = document.querySelector('#ru');
const langSet = document.querySelector('.language_description');
const sourceSet = document.querySelector('.img-API_description');


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
  const languages = document.querySelectorAll('.language');
  languages.forEach( lang => lang.classList.remove('active'))
  e.target.classList.add('active')
  if (e.target.classList.contains('language_eng')) {
    state.language = 'en'
    eng.textContent = "ENG"
    rus.textContent = "RU"
    langSet.textContent = 'Language:'
    sourceSet.textContent = 'Image source:'
  } else {
    state.language = 'ru'
    eng.textContent = "АНГ"
    rus.textContent = "РУС"
    langSet.textContent = 'Язык приложения:'
    sourceSet.textContent = 'Ресурс изображений:'
  }
  updateGreeting();
  updateDate();
  getWeather(cityName.value);
  getQuotes();
  updateNamePlaceholder();
 }

 if (e.target.classList.contains('img-API')) {
  const imgAPIs = document.querySelectorAll('.img-API');
  imgAPIs.forEach( lang => lang.classList.remove('active'))
  e.target.classList.add('active')

  getLinks(state.photoSource[e.target.id])
 }
}

const gear = document.querySelector('#gear');

gear.addEventListener('click', toggleSettings)

function toggleSettings() {
  if (settings.style.transform == "translate(-50%, 0px)")  settings.style.transform = "translate(-50%, -100%)"
  else settings.style.transform = "translate(-50%, 0px)"
}

