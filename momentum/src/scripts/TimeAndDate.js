const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

const time = document.querySelector('#time');
const date = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');

function updateNamePlaceholder() {
  if (state.language == 'en') name.placeholder = '[Enter name]' 
  else name.placeholder = '[Введите имя]'
}

const options = { weekday: 'long', month: 'long', day: 'numeric'};
let dateObj = new Date();
let startHours;
let startDate;

const greetings = {
  'en': ['Good night','Good morning','Good afternoon','Good evening'],
  'ru': ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
}

updateTime();

function updateTime() {
  dateObj = new Date();
  const currentHours = dateObj.getHours();
  const currentDate = dateObj.getDate();
  showTime(dateObj);
  if (startDate !== currentDate) updateDate(dateObj)
  if (startHours !== currentHours) updateGreeting(currentHours)
}

function showTime(dateObj) {
  const currentTime = dateObj.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(updateTime, 1000 );
}

function updateDate(currentDate=new Date()) {
  startDate = currentDate; 
  let language = state.language == 'en' ? 'en-US' : 'ru-Ru'
  date.textContent = dateObj.toLocaleDateString(language, options);
}

function getTimeOfDay(currentHours = new Date().getHours()) {
  startHours = currentHours;
  let dayQuoter = Math.floor(currentHours/6)
  /*
  if (currentHours>=0 && currentHours<6) timeOfDay = 0;
  else if (currentHours>=6 && currentHours<12) timeOfDay = 1;
  else if (currentHours>=12 && currentHours<18) timeOfDay = 2;
  else if (currentHours>=18 && currentHours<24) timeOfDay = 3;
  */
  return dayQuoter;
}

function updateGreeting(currentHours = dateObj.getHours()) {
  greeting.textContent = greetings[state.language][getTimeOfDay(currentHours)]
}

export {getTimeOfDay, updateGreeting, updateDate, updateNamePlaceholder, state};
