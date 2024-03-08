import React, { useState } from 'react'
import './WeatherApp.css'
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
const WeatherApp = () => {

    // let api_key="27c6cd99506a100f0db1d82f142b9739";
    // const search=async ()=>{

    //     const element= document.getElementsByClassName("cityInput");
    //     if(element[0].value==="")
    //     {
    //         return 0;
    //     }
    //     let url='https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}';

    //     let response=  await fetch(url);
    //     let data = await response.json();
       
    //     const humidity=document.getElementsByClassName("humidity-percent");
    //     const wind= document.getElementsByClassName("wind-rate");
    //     const temprature=document.getElementsByClassName("weather-temp");
    //     const location=document.getElementsByClassName("weather-location");
        
    //     humidity[0].innerHTML=data.main.humidity+"%";
    //     wind[0].innerHTML=data.wind.speed+"km/h";
    //     temprature[0].innerHTML=data.main.temp+"C";
    //     location[0].innerHTML=data.name;
    // }
    let api_key = "27c6cd99506a100f0db1d82f142b9739";
    const [wicon,setWicon] = useState(cloud_icon);
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        const city = element.value.trim();

        if (city === "") {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.main) {
                const humidity = document.getElementsByClassName("humidity-percent")[0];
                const wind = document.getElementsByClassName("wind-rate")[0];
                const temperature = document.getElementsByClassName("weather-temp")[0];
                const location = document.getElementsByClassName("weather-location")[0];

                humidity.innerHTML = Math.floor(data.main.humidity) + "%";
                wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
                temperature.innerHTML = Math.floor(data.main.temp) + "°C";
                location.innerHTML = data.name;
                if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n")
                {
                   setWicon(clear_icon);
                }
                else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n")
                {
                    setWicon(cloud_icon);
                }
                else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n")
                { 
                    setWicon(drizzle_icon);
                }
                else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n")
                {
                    setWicon(drizzle_icon);
                }
                else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n")
                {
                    setWicon(rain_icon);
                }
                else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n")
                {
                    setWicon(rain_icon);
                }
                else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n")
                {
                    setWicon(snow_icon);
                }
                else{
                  setWicon(clear_icon);
                }


            } else {
                console.error("Weather data not available for the specified location.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };


  return (
    <div className='container'>
      <div className="top-bar"> 
      <input type="text" className="cityInput" placeholder='search'/>
      <div className="search-icon" onClick={()=>{search()}}>
        <img src={search_icon} alt="" />
      </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">18 Km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
