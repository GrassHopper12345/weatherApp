var geoCode = getGeoCode
var fiveDayForecastEl = document.querySelector('#five-day');
var cityButtonEl = document.querySelector('.btn.btn-primary.city');

function getFiveDayWeather(data) {

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=c5d423c4815b48e87a0ce37757048cf1&units=imperial`)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayFiveDayForecast(data);
    })
}

function currentWeather(data) {
  var lat = data[0].lat
  var lon = data[0].lon
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c5d423c4815b48e87a0ce37757048cf1&units=imperial`)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentCity(data);
    })
}

function getGeoCode(cityName) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=c5d423c4815b48e87a0ce37757048cf1`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getFiveDayWeather(cityName);
      currentWeather(data)
    });
}

function search() {
  this.getFiveDayWeather(document.querySelector("#search-bar").value);
  console.log(value);
};

document.querySelector("#search-bar").addEventListener("click", function () {
  document.querySelector("#text-input").value;
  getGeoCode(document.querySelector("#text-input").value);
});

document.querySelector("#search-bar").addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    getCurrentWeather.search();
  }

  document.querySelector(".card").addEventListener("click", function (event) {
    getCurrentWeather.search
  });

});

function displayFiveDayForecast(forecast) {
  console.log(forecast)
  const filteredArray = forecast.list.filter(function (forecast) {
    if (forecast.dt_txt.includes('03:00:00')) {
      console.log(forecast);
      return forecast;
    }
  })
  for (var i = 0; i < filteredArray.length; i++) {
    var weather = document.createElement("div");
    weather.classList = 'list-item flex-row justify-space-between align-center';

    var fiveDays = document.createElement("span");

    // Need to see the dates
    var date = document.createElement("p");
    date.innerText = filteredArray[i].dt_txt;
    fiveDays.appendChild(date);
    var weatherIcon = document.createElement("p");
    weatherIcon.innerText = forecast.list[i].weather.icon;
    fiveDays.appendChild(weatherIcon);
    var temperature = document.createElement("p");
    temperature.innerText = filteredArray[i].main.temp;
    fiveDays.appendChild(temperature);
    var humidity = document.createElement("p");
    humidity.innerText = filteredArray[i].main.humidity;
    fiveDays.appendChild(humidity);
    var wind = document.createElement("p");
    wind.innerText = filteredArray[i].wind.speed;
    fiveDays.appendChild(wind);

    weather.appendChild(fiveDays);

    fiveDayForecastEl.appendChild(weather);
  }
}

var currentCityEl = document.querySelector("#current-city");

function currentCity(forecast) {

  var displayCityName = document.createElement("h2");
  displayCityName.innerText = forecast.name;
  currentCityEl.appendChild(displayCityName);
  // var date = document.createElement("p");
  // date.innerText = forecast.dt_txt;
  // currentCityEl.appendChild(date);
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`) 
  weatherIcon.setAttribute('class', 'w-25 h-25');
  currentCityEl.appendChild(weatherIcon);
  var temperature = document.createElement("p");
  temperature.innerText = forecast.main.temp;
  currentCityEl.appendChild(temperature);
  var humidity = document.createElement("p");
  humidity.innerText = forecast.main.humidity;
  currentCityEl.appendChild(humidity);
  var wind = document.createElement("p");
  wind.innerText = forecast.wind.speed
  currentCityEl.appendChild(wind);

}



cityButtonEl.addEventListener("click", function (event) {
  var cityName = event.target.innerText;
  console.log(cityName);
  getFiveDayWeather(cityName);
  // currentCityEl(cityName);
});


