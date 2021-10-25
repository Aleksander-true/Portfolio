import { state } from "./TimeAndDate";

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityName = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

let wetherTerms = {
  'en': {wind: 'wind speed', windUnits: 'm/s', humidity: 'humidity'},
  'ru': {wind: 'скорость ветра', windUnits: 'м/с', humidity: 'влажность'}
}
getWeather(cityName.value || 'minsk')

cityName.addEventListener("change", () => {
  getWeather(cityName.value)
})

async function getWeather(city='minsk') {
  let lang = state.language
  const api_key = 'ef5e10fdc5ecfe3b8b6db6cb6096d245';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${api_key}&units=metric`
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json(); 
      cityName.value = data.name;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      wind.textContent = wetherTerms[lang].wind + ' ' + Math.round(data.wind.speed) + ' ' + wetherTerms[lang].windUnits;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      humidity.textContent = wetherTerms[lang].humidity + ' ' + Math.round(data.main.humidity) + '%';
      weatherDescription.textContent = data.weather[0].description;
      weatherError.textContent = ''
    } else {
      cityName.value = "Unavailable"
      clearWeather()
      weatherError.textContent = response.statusText ;
    }
  } catch (error) {
    cityName.value = "Unavailable"
    clearWeather()
    weatherError.textContent = error.message ;
  }
    
  setTimeout(getWeather, 600000 )
}

function clearWeather() {
  weatherIcon.className = 'weather-icon owf';
  wind.textContent = '';
  temperature.textContent = '';
  humidity.textContent = '';
  weatherDescription.textContent = '';
}

export {getWeather};