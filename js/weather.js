const weatherIcon = document.querySelector(".js-weather-icon");
const weatherTemperature = document.querySelector(".js-weather-temperature");
const myWeather = document.querySelector(".js-weather");
const COORDS_LS = "coords";
const API_KEY = "3d5ed41bd810769904248ced277cca50";


function getWeatherIcon(iconObj){
    const weatherId = iconObj.id;
    const weatherMain = iconObj.main;
    console.log(weatherId, weatherMain);

    if(weatherId === 800){
        weatherIcon.classList.add("fas","fa-sun");
    } else if(weatherMain === "Thunderstorm"){
        weatherIcon.classList.add("fas","fa-bolt");
    } else if (weatherMain === "Drizzle" || weatherMain === "Rain" ){
        weatherIcon.classList.add("fas","fa-cloud-showers-heavy");
    } else if (weatherMain === "Snow"){
        weatherIcon.classList.add("fas","fa-snowflake");
    } else if (weatherId > 700 && weatherId < 800){
        weatherIcon.classList.add("fas","fa-smog");
    } else if (weatherMain === "Clouds"){
        weatherIcon.classList.add("fas","fa-cloud");
    }
}

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response) {
        return response.json()
    })
    .then(function(json){
        console.log("here",json);
        const temp = json.main.temp;
        const hightemp = json.main.temp_max;
        const lowtemp = json.main.temp_min;
        const place = json.name;
        const weatherIcon = json.weather[0];
        console.log(json.main.temp, json.name);
        console.log(weatherTemperature.childNodes);
        weatherTemperature.childNodes[1].innerHTML = `${temp}º`;
        weatherTemperature.childNodes[3].innerHTML = `${hightemp}º / ${lowtemp}º`;
        myWeather.innerHTML = `@ ${place}`;
        getWeatherIcon(weatherIcon);
    });
}

function saveCoords(coordsObj){
localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();