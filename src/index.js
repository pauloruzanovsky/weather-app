import './style.css';

let weatherLocation = 'Joinville';
let weatherUrl;
let response;
let weatherData;
let locationDOM = document.querySelector('.location-name');
let avgTempDOM = document.querySelector('.avg-temp');
let descriptionDOM = document.querySelector('.description');
let feelsLikeDOM = document.querySelector('.feels-like');
let maxTempDOM = document.querySelector('.max-temp');
let minTempDOM = document.querySelector('.min-temp');
let humidityDOM = document.querySelector('.humidity');
let windDOM = document.querySelector('.wind');
let sunriseDOM = document.querySelector('.sunrise');
let sunsetDOM = document.querySelector('.sunset');
let form = document.querySelector('form');
let locationInput = document.querySelector('.location-input');
let submitFormButton = document.querySelector('.submit-form');
let unit = document.querySelector('.unit');


async function getWeatherData() {
  weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&units=metric&APPID=ffa34782bdb5411f0f4c854704f8f566`

  response = await (await fetch(weatherUrl, {mode: 'cors'})).json();
  console.log(response);
  weatherData = {
    location: response.name,
    feelsLike: response.main.feels_like,
    humidity: response.main.humidity,
    pressure: response.main.pressure,
    avgTemp: response.main.temp,
    minTemp: response.main.temp_min,
    maxTemp: response.main.temp_max,
    country: response.sys.country,
    description: response.weather[0].description,
    wind: response.wind.speed,
    sunrise: new Date(response.sys.sunrise*1000).toLocaleTimeString("default"),
    sunset: new Date(response.sys.sunset*1000).toLocaleTimeString("default"),

  }
  console.log(weatherData);


}

async function inputDataIntoDOM() {
  locationDOM.textContent = `${weatherData.location}, ${weatherData.country}` ;
  avgTempDOM.textContent = `${Math.round(weatherData.avgTemp)}°`
  const finalDescription = weatherData.description.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  descriptionDOM.textContent = finalDescription;
  feelsLikeDOM.textContent = `Feels like ${Math.round(weatherData.feelsLike)}°`;
  maxTempDOM.textContent = `Max ${Math.round(weatherData.maxTemp)}°`;
  minTempDOM.textContent = `Min ${Math.round(weatherData.minTemp)}°`;
  humidityDOM.textContent  = `Humidity at ${weatherData.humidity}%`;
  windDOM.textContent  = `Wind speed at ${weatherData.wind} km/h`;
  sunriseDOM.textContent  = `Sun rises at ${weatherData.sunrise}`;
  sunsetDOM.textContent  = `Sun sets at ${weatherData.sunset}`;

}

async function getDataAndInputIntoDOM() {
await getWeatherData();
inputDataIntoDOM();
}
getDataAndInputIntoDOM();

submitFormButton.addEventListener('click', async (e) => {
  weatherLocation = locationInput.value;
  e.preventDefault();
  getDataAndInputIntoDOM();
  locationInput.value = "";
})

unit.addEventListener('click', () => {
  if(unit.textContent === "°C") {
    unit.textContent = "°F";
    avgTempDOM.textContent = `${Math.round(weatherData.avgTemp*9/5 + 32)}°`
    feelsLikeDOM.textContent = `Feels like ${Math.round(weatherData.feelsLike*9/5 + 32)}°`;
    maxTempDOM.textContent = `Max ${Math.round(weatherData.maxTemp*9/5 + 32)}°`;
    minTempDOM.textContent = `Min ${Math.round(weatherData.minTemp*9/5 + 32)}°`;
  } else {
    unit.textContent = "°C";
    avgTempDOM.textContent = `${Math.round(weatherData.avgTemp)}°`
    feelsLikeDOM.textContent = `Feels like ${Math.round(weatherData.feelsLike)}°`;
    maxTempDOM.textContent = `Max ${Math.round(weatherData.maxTemp)}°`;
    minTempDOM.textContent = `Min ${Math.round(weatherData.minTemp)}°`;
  }
})