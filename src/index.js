function refreshWeather(response) {
    temperatureElement= document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
 temperatureElement.innerHTML = Math.round(temperature);

 let descriptionElement = document.querySelector("#description");
 let description = response.data.condition.description;
 descriptionElement.innerHTML = description;

 let humidityElement = document.querySelector("#humidity");
 let humidity = response.data.temperature.humidity;
 humidityElement.innerHTML = `${Math.round(humidity)}%`;

 let windElement = document.querySelector("#wind");
 let wind = response.data.wind.speed;
 windElement.innerHTML = `${Math.round(wind)}km/h`;

 let date= new Date(response.data.time * 1000);
 let timeElement = document.querySelector("#time");
 timeElement.innerHTML = formatDate(date);

 let iconElement = document.querySelector("#icon");
iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weather-emoji" />`;

getForecast(response.data.city);

}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes<10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hour}:${minutes},`
}


function searchCity(city){
let apiKey = "279o37234fc0ba3effba9a107a3601tc";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input"); 
    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "279o37234fc0ba3effba9a107a3601tc";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}

function formatDayForecast (timestamp) {
    let date= new Date(timestamp * 1000);
    let days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

function displayForecast (response){
let forecastHtml = "";

response.data.daily.forEach(function (day,index) {
    if (index < 5) {
        forecastHtml = forecastHtml + `
<div class= "weather-forecast-day"> 
<div class="weather-forecast-date"> ${formatDayForecast(day.time)} </div> 
<img src=${day.condition.icon_url}" class="weather-forecast-icon"/> 
<div class="weather-forecast-temperatures">
<div class="weather-forecast-temperature">
<strong> ${Math.round(day.temperature.maximum)}°C </strong>
</div>
<div class="weather-forecast-temperature"> ${Math.round(day.temperature.minimum)}°C </div>
</div>
</div>
`;
  } 
});

 let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Porto");


