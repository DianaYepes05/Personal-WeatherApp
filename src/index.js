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

function search(city){
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let units = "metric";
 // let city = "Madrid";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(temperatureInfo);
}

function temperatureInfo(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#highTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function cityName(event) {
  event.preventDefault();

  document.querySelector("#city").innerHTML = newCity.value;

  let city = newCity.value;
  search(city);
}

let citySearch = document.querySelector("#searchingRow");
citySearch.addEventListener("click", cityName);

function currentLocation(position) {
  let units = "metric";
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let weatherInfo = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${weatherInfo}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(temperatureInfo);
}

function currentButtonWeather() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentButtonWeather);

search("New York");
