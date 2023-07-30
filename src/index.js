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
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    document.querySelector("#weather-icon").setAttribute("alt",`${response.data.condition.description}`)
}

function cityName(event) {
  event.preventDefault();

  document.querySelector("#city").innerHTML = newCity.value;

  let city = newCity.value;
  search(city);
}

let citySearch = document.querySelector("#searchingRow");
citySearch.addEventListener("submit", cityName);

function currentLocation(position) {
  let units = "metric";
  let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
  let weatherInfo = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${weatherInfo}lat=${position.coordinates.latitude}&lon=${position.coordinates.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(temperatureInfo);
}

function currentButtonWeather() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentButtonWeather);

//function foreCast(city) {
//let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
//let weatherInfo = "https://api.shecodes.io/weather/v1/forecast?";
//let apiUrl = `${weatherInfo}${city}&key=${apiKey}`;

//document.querySelector("#").innerHTML = Math.round(
//response.data.temperature.maximum
//);
//document.querySelector("#").innerHTML = Math.round(
//response.data.temperature.minimum
// );

//axios.get(apiUrl).then();
//}

search("New York");
