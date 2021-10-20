const time = document.querySelector('#time');
const date = document.querySelector('#date');
const greeting = document.querySelector('#greeting');

const options = { weekday: 'long', month: 'long', day: 'numeric'};
let dateObj = new Date();
let startHours;
let startDate;
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

function updateDate(currentDate) {
  startDate = currentDate; 
  date.textContent = dateObj.toLocaleDateString('en-US', options);
}

function getTimeOfDay(currentHours = new Date().getHours()) {
  startHours = currentHours;
  let timeOfDay;
  if (currentHours>=0 && currentHours<6) timeOfDay = 'night';
  else if (currentHours>=6 && currentHours<12) timeOfDay = 'morning';
  else if (currentHours>=12 && currentHours<18) timeOfDay = 'afternoon';
  else if (currentHours>=18 && currentHours<24) timeOfDay = 'evening';
  return timeOfDay;
}

function updateGreeting(currentHours) {
  greeting.textContent = `Good ${getTimeOfDay(currentHours)}`
}

export {getTimeOfDay};
