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
function updateCityData(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  let precipitation = document.querySelector("#currentPrecipitation");
  let humidity = document.querySelector("#currentHumidity");
  let wind = document.querySelector("#currentWind");
  let temp = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;

  precipitation.innerHTML = `Precipitation: ${response.data.weather[0].main} `;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  temp.innerHTML = Math.round(celsiusTemperature);
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

search();
