// Set the current time
function setDateTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

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

  let dateToUpdate = document.querySelector("#currentDate");
  dateToUpdate.innerHTML = `${day} ${hour}:${minute}`;
}
setDateTime();

// Update the name of the city and temperature on the page
let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
function updateCityTitle(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#currentCity");
  let newCityEntry = document.querySelector("#newCity");
  currentCity.innerHTML = newCityEntry.value;

  // Get temperature
  let weatherEndpoint = "api.openweathermap.org/data/2.5/weather";
  let apiURL = `https://${weatherEndpoint}?q=${newCityEntry.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiURL).then(updateCityData);
}

// Get city's temperature, precipitation, humidity, and wind
function getForecast(coordinates) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function updateCityData(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  let precipitation = document.querySelector("#currentPrecipitation");
  let humidity = document.querySelector("#currentHumidity");
  let wind = document.querySelector("#currentWind");
  let temp = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");

  precipitation.innerHTML = `Precipitation: ${response.data.weather[0].main} `;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  temp.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", updateCityTitle);

// Update the units of temperature
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", updateCityTitle);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Current Location Button

function searchLocation(position) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let date = new Date(response.data.daily[0].time * 1000);
  let dayOfWeek = date.getDay();
  let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let nameOfDayOfWeek = daysOfWeek[dayOfWeek];

  // let forecastDailyHTML;
  forecastDailyHTML = `<div class="row"><div class="col border border-3"></div>`;

  // forecastDailyHTML = forecastDailyHTML + ` <div class="col-1"></div> `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      console.log(index);
      forecastDailyHTML =
        forecastDailyHTML +
        ` <div class="col border border-3">
  <div class="col center" >${formatDay(forecastDay.dt)}</div>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
  id="forecast-heaven-icon"
  width="65"
  />
  <div class="center">
  <span class="max">${Math.round(
    forecastDay.temp.max
  )}°</span> <span class="min">${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>`;
    }
  });

  // console.log(forecastDailyHTML);
  forecastDailyHTML = forecastDailyHTML + `</div>`;
  forecastElement.innerHTML = forecastDailyHTML;
}
searchDefaultCity("Kyiv");
