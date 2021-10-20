const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityName = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

getWeather('minsk', "en")

cityName.addEventListener("change", () => {
  getWeather(cityName.value, "en")
})

async function getWeather(city, lang = 'en') {
  const api_key = 'ef5e10fdc5ecfe3b8b6db6cb6096d245';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${api_key}&units=metric`
  
  const response = await fetch(url);
  const data = await response.json(); 

  cityName.value = data.name;
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  wind.textContent = `Wind speed ${data.wind.speed}m/s`;
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

