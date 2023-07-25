function search(response) {
  console.log(response.data);
}

let apiKey = "2e036aa0bt1df0677b37040f98ffo9f4";
let units = "metric";
let city = "Madrid";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(search);
