
const bookingForm = document.forms.booking;
const date = document.forms.booking.date
const time = document.forms.booking.time
const name = document.forms.booking.name
const email = document.forms.booking.email
const tel = document.forms.booking.tel
const overviewTime = document.querySelector('.overview__received_time')


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
})
