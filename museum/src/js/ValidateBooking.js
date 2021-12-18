const bookingForm = document.forms.booking;
const date = document.forms.booking.date
const time = document.forms.booking.time
const nameInput = document.forms.booking.name
const email = document.forms.booking.email
const tel = document.forms.booking.tel
const overviewTime = document.querySelector('.overview__received_time')
const overviewDate = document.querySelector('.overview__received_date')


time.addEventListener('blur', (e) => {
  e.preventDefault();
  let hours = Number(time.value.slice(0,2));
  let minutes = Number(time.value.slice(3,5));

  if (minutes >= 0 && minutes < 15 ) minutes = '00';
  if (minutes >= 15 && minutes < 45 ) minutes = '30';
  if (minutes >= 45 && minutes < 60 && hours <= 17) {minutes = '00'; hours++;}
  else {minutes = '00'}

  if (hours <= 9 ) hours = '09';
  if (hours >= 18) hours = '18';

  time.value = `${hours}:${minutes}`;
  overviewTime.textContent = time.value;
  time.classList.add('valid')
})


date.addEventListener('blur', (e) => {
  e.preventDefault();
  let now = new Date();
  let input = new Date(date.value);
  let inMonth = input.getMonth()
  let inDate = input.getDate()
  let inDay = input.getDay();

  if (input.getTime() - now.getTime() < 0) {
    inMonth = now.getMonth()
    inDate = now.getDate()
    inDay = now.getDay();
    outputMonth = inMonth + 1 > 9 ? inMonth + 1 : '0' + inMonth + 1;
    outputDate = inDate > 9 ? inDate : '0' + inDate;
    date.value = `${now.getFullYear()}-${outputMonth}-${outputDate}`
  }

  overviewDate.textContent = `${getNameDay(inDay)}, ${getNameMonth(inMonth)} ${inDate}`;
  date.classList.add('valid')
})

nameInput.addEventListener('blur', (e) => {
  e.preventDefault();
  let regexp = /^[a-zа-яё ]{3,15}$/i
  if (regexp.test(nameInput.value)) nameInput.classList.add('valid')
  else {
    nameInput.classList.add('invalid')
    alert('Invalid name.\nName cannot be less than 3 and more than 15 symbols including spaces.\nPlease try again.')
  }

})

nameInput.addEventListener('focus', () => {
  nameInput.classList.remove('invalid', 'valid')
})

email.addEventListener('blur', (e) => {
  e.preventDefault();
  let regexp = /^[a-z0-9_-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/i
  if (regexp.test(email.value)) email.classList.add('valid')
  else {
    email.classList.add('invalid')
    alert('Invalid email.\nEmail should be looks like username@example.com .\nPlease try again.')
  }
})

email.addEventListener('focus', () => {
  email.classList.remove('invalid', 'valid')
})

tel.addEventListener('blur', (e) => {
  e.preventDefault();
  let isCorrect = false;
  let telFull = /^[0-9]{0,10}$/
  let telPart = /^[0-9]{2,3}$/
  let telStr = tel.value.replaceAll(' ', '-')
  if (telStr.includes('-')) {
    let tels = telStr.split('-')
    console.log('tels=', tels)
    isCorrect = tels.every(item => telPart.test(item)) && (tels.join('').length <=10)
  } else {
    isCorrect = telFull.test(telStr);
  }

  if (isCorrect) tel.classList.add('valid')
  else {
    tel.classList.add('invalid');
    alert('Invalid phone number.\nPhone number should be shorter than 10 digits and may include spaces or dashes to separate 2 or 3 digits.\nPlease try again.')
  }
})

tel.addEventListener('focus', () => {
  tel.classList.remove('invalid', 'valid')
})


function getNameDay(n) {
  switch (n) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}

function getNameMonth(n) {
  switch (n) {
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
  }
}
