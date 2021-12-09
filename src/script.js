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
let displayedDate = document.querySelector("#date");
displayedDate.innerHTML = `${day} ${hours}:${minutes}`;
//
function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Tuesday", "Wednesday", "Thursday", "Friday"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <ul class="list-group">
                <li class="list-group-item">
                  <div class="weather-forecast-date">${day}</div>
                </li>
                <li class="list-group-item">
                  <div class="weather-forecast-temperature">
                    16°C
                  </div>
                </li>
                <li class="list-group-item">
                  <img
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt=""
                    width="30px"
                  />
                </li>
              </ul>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//life city search

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("#city");
  let displayedTemperature = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");

  h1.innerHTML = `${city}`;
  displayedTemperature.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-button");
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

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
  fahrenheit.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
function changeToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

//search("New York");
