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
const tagsSet = document.querySelector('.settings-container.tags');  
const blockVisibility = document.querySelector('.block-visibility_description');  
const weatherSet = document.querySelector('.block_weather');  
const playerSet = document.querySelector('.block_player');  
const quotesSet = document.querySelector('.block_quotes');  
const timeSet = document.querySelector('.block_time');  
const dateSet = document.querySelector('.block_date');  
const greetingSet = document.querySelector('.block_greeting');  
const tagsDescription = document.querySelector('.tags_description');  
let currentSource;



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
    blockVisibility.textContent = 'Show blocks:'
    weatherSet.textContent = 'Weather'
    playerSet.textContent = 'Player'
    quotesSet.textContent = 'Quotes'
    timeSet.textContent = 'Time'
    dateSet.textContent = 'Date'
    greetingSet.textContent = 'Greeting'
    tagsDescription.textContent = 'Enter tags:'
  } else {
    state.language = 'ru'
    eng.textContent = "АНГ"
    rus.textContent = "РУС"
    langSet.textContent = 'Язык приложения:'
    sourceSet.textContent = 'Ресурс изображений:'
    blockVisibility.textContent = 'Показывать блоки:'
    weatherSet.textContent = 'Погода'
    playerSet.textContent = 'Плеер'
    quotesSet.textContent = 'Цитаты'
    timeSet.textContent = 'Время'
    dateSet.textContent = 'Дата'
    greetingSet.textContent = 'Приветствие'
    tagsDescription.textContent = 'Введите тэги:'
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
  if (e.target.id !== 'github') tagsSet.style.visibility = 'visible'
  else tagsSet.style.visibility = 'hidden'
  currentSource = state.photoSource[e.target.id]
  getLinks(currentSource)
 }

 if (e.target.classList.contains('block-visibility')) {
  e.target.classList.toggle('active')
  if (e.target.classList.contains('block_weather')) document.querySelector('#weather').classList.toggle('hidden')
  if (e.target.classList.contains('block_time')) document.querySelector('#time').classList.toggle('hidden')
  if (e.target.classList.contains('block_date')) document.querySelector('#date').classList.toggle('hidden')
  if (e.target.classList.contains('block_quotes')) document.querySelector('#footer').classList.toggle('hidden')
  if (e.target.classList.contains('block_player')) document.querySelector('#player').classList.toggle('hidden')
  if (e.target.classList.contains('block_greeting')) document.querySelector('#greeting-container').classList.toggle('hidden')
  }
}

const gear = document.querySelector('#gear');

gear.addEventListener('click', toggleSettings)

function toggleSettings() {
  if (settings.style.transform == "translate(-50%, 0px)")  settings.style.transform = "translate(-50%, -100%)"
  else settings.style.transform = "translate(-50%, 0px)"
}

const inputTags = document.querySelector('#input-tags')
inputTags.addEventListener('change', userTags)

function userTags() {
  getLinks(currentSource, inputTags.value)
}