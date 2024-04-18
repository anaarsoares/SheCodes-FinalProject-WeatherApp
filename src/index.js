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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Porto");