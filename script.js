let currCity='Tokyo';
let units='metric';

let city=document.querySelector(".weather-city")
let datetime=document.querySelector(".weather-date-time");
let weather_forecast =document.querySelector(".weather-forecast")
let weather_temp=document.querySelector(".weather-temp")
let weather_icons=document.querySelector(".weather-icons")
let weather_minmax=document.querySelector(".weather-minmax")
let weather_realfeel=document.querySelector(".weather-realfeel")
let weather_humidity=document.querySelector(".weather-humidity")
let weather_wind=document.querySelector(".weather-wind")
let weather_pressure=document.querySelector(".weather-pressure")

document.querySelector(".weather-search").addEventListener('submit', e=>{
    let search=document.querySelector(".weather-searchfor");
    e.preventDefault();
    currCity=search.value;
    getWeather();
    search.value="";
})

document.querySelector(".weather-celsius").addEventListener('click', ()=>{
    if(units!=="metric"){
        units="metric";
        getWeather();
    }
})

document.querySelector(".weather-farenheit").addEventListener('click', ()=>{
    if(units!=="imperial"){
        units="imperial";
        getWeather();
    }
})

function convertCode(country){
    let region=new Intl.DisplayNames
    (["en"], {type:"region"});
    return region.of(country)
}

function convertTime(timestamp,timezone){
    const convertTimezone = timezone/(60*60);
    const date = new Date(timestamp*1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone>=0 ? "-":"+"}${Math.abs(convertTimezone)}`,
        hour12:true,
    }
    return date.toLocaleString("en-US",options)
}

function getWeather(){
    const API_KEY='2f3ba15fa3ed5170551dc4ac6fbfb17b';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then
    (res => res.json()).then(data =>{
        city.innerHTML=`${data.name},${convertCode(data.sys.country)}`
        datetime.innerHTML=convertTime(data.dt, data.timezone)
        weather_forecast.innerHTML= `<p>${data.weather[0].main}</p>`
        weather_temp.innerHTML=`${data.main.temp.toFixed()}&#176${units==="imperial" ? "F": "C"}`
        weather_icons.innerHTML=` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        weather_minmax.innerHTML=`<p>Min: ${data.main.temp_min.toFixed()}&#176${units==="imperial" ? "F": "C"}</p>
                                  <p>Max: ${data.main.temp_max.toFixed()}&#176${units==="imperial" ? "F": "C"}</p>`
        weather_realfeel.innerHTML=`${data.main.feels_like.toFixed()}&#176${units==="imperial" ? "F": "C"}`
        weather_humidity.innerHTML= `${data.main.humidity}%`
        weather_wind.innerHTML= `${data.wind.speed} ${units==="imperial" ? "mph": "m/s"}`
        weather_pressure.innerHTML= `${data.main.pressure} hPa`
    });
};

document.body.addEventListener('load',getWeather())
