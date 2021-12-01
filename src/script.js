let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

//life city search

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${city}`;
  let displayedTemperature = document.querySelector("#temperature");
  displayedTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-button");
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//current location weather

function showcurrentPositionWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${city}`;
  let displayedTemperature = document.querySelector("#temperature");
  displayedTemperature.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showcurrentPositionWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = "63";
}
let change = document.querySelector("#fahrenheit-link");
change.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = "17";
}
let changeBack = document.querySelector("#celsius-link");
changeBack.addEventListener("click", changeToCelsius);
