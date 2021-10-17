const time = document.querySelector('#time');
const date = document.querySelector('#date');

const options = { weekday: 'long', month: 'long', day: 'numeric'};

function showDateTime() {
  const dateObj= new Date();
  const currentTime = dateObj.toLocaleTimeString();
  time.textContent = currentTime;
  date.textContent = dateObj.toLocaleDateString('en-US', options);
}

setInterval(showDateTime, 1000 );
