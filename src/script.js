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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
//
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <ul class="list-group">
                <li class="list-group-item">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                </li>
                <li class="list-group-item">
                  <div class="weather-forecast-temperature">
                    ${Math.round(forecastDay.temp.day)}°C
                  </div>
                </li>
                <li class="list-group-item">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="30px"
                  />
                </li>
              </ul>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//life city search

function getForecast(coordinates) {
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
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

function search(city) {
  let apiKey = "d40278b3a2665b090377296b072f8feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-button");
  search(cityInput.value);
}

//

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Shanghai");
