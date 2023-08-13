let now = new Date();

function todayIs() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];

  let date = now.getDate();

  let month = months[now.getMonth()];

  let today = `${day}, ${month} ${date}`;

  return today;
}

document.querySelector("#today").innerHTML = todayIs();

function currentTime() {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timing = `${hour}:${minutes}`;
  return timing;
}

document.querySelector("#time").innerHTML = currentTime();

function search(city) {
  let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
  let units = "metric";
  let weatherInfo = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${weatherInfo}query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(temperatureInfo);
}

function temperatureInfo(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  celsiusTemp = response.data.temperature.current;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  feelsLike = response.data.temperature.feels_like;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#windSpeed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km/h`;

  kmH = response.data.wind.speed;

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `${response.data.condition.description}`);

  showForecastWeather(response.data.coordinates);
}

function cityName(event) {
  event.preventDefault();

  document.querySelector("#city").innerHTML = newCity.value;

  search(newCity.value);
}

let citySearch = document.querySelector("#searchingRow");
citySearch.addEventListener("submit", cityName);

function currentLocation(position) {
  let units = "metric";
  let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
  let weatherInfo = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${weatherInfo}lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(temperatureInfo);
}

function currentWeatherButton() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentWeatherButton);

function showForecastWeather(coordinates) {
  let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function weatherForecast(response) {
  let forecast = response.data.daily;
  
  let forecastWeather = document.querySelector("#forecastWeather");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (dailyForcast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
        <div class="forecastDay">${formatDay(dailyForcast.time)}</div>
          <img
            src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              dailyForcast.condition.icon
            }.png"
            alt=""
            width="36"
          />
          <div id="forecast-temp">
          <span class="forecastTemp-max">${Math.round(
            dailyForcast.temperature.maximum
          )}° </span>
          <span class="forecastTemp-min">${Math.round(
          dailyForcast.temperature.minimum
        )}°</span>
        </div>
      </div>`;
    }

    forecastMaxTemp = Math.round(dailyForcast.temperature.maximum);
    forecastMinTemp = Math.round(dailyForcast.temperature.minimum);

  });

  forecastHTML = forecastHTML + `</div>`;
  forecastWeather.innerHTML = forecastHTML;
}

function fahrenheitConversion(event) {
  event.preventDefault();

  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheit);
    
  let forecastMaxFahrenheit = (forecastMaxTemp * 9) / 5 + 32;
  let maxTemp = document.querySelector(".forecastTemp-max");
  maxTemp.innerHTML = `${Math.round(forecastMaxFahrenheit)}°` ;
  
  let forecastMinFahrenheit = (forecastMinTemp * 9) / 5 + 32;
  let minTemp = document.querySelector(".forecastTemp-min");
  minTemp.innerHTML = `${Math.round(forecastMinFahrenheit)}°` ;

  let sensation = (feelsLike * 9) / 5 + 32;
  let feeling = document.querySelector("#feels-like");
  feeling.innerHTML = Math.round(sensation);

  let wind = kmH / 1.609344;
  let speed = document.querySelector("#windSpeed");
  speed.innerHTML = `Wind: ${Math.round(wind)} mph`;

  imperial.classList.add("active");
  metrics.classList.remove("active");
}

function backToCelsius(event) {
  event.preventDefault();

  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);

  let maxTemp = document.querySelector(".forecastTemp-max");
  maxTemp.innerHTML = forecastMaxTemp;

  let minTemp = document.querySelector(".forecastTemp-min");
  minTemp.innerHTML = forecastMinTemp;

  let sensation = document.querySelector("#feels-like");
  sensation.innerHTML = Math.round(feelsLike);

  let speed = document.querySelector("#windSpeed");
  speed.innerHTML = `Wind: ${Math.round(kmH)} Km/h`;

  imperial.classList.remove("active");
  metrics.classList.add("active");
}

let celsiusTemp = null;
let feelsLike = null;
let kmH = null;
let forecastMaxTemp = null;
let forecastMinTemp = null;

let imperial = document.querySelector("#fahrenheit");
imperial.addEventListener("click", fahrenheitConversion);

let metrics = document.querySelector("#celsius");
metrics.addEventListener("click", backToCelsius);

search("New York");
