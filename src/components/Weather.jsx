import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import humidity_icon from "../Assets/humidity.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const Weather = () => { 

  const inputRef = useRef()
  const [weatherData , setWeatherData] = useState(false);

  const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03n": cloud_icon,
  "03d": cloud_icon,
  "04d": drizzle_icon,
  "04n":drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
}
  const search = async (city)=> {
    if(city=== "") {
      alert("Enter city Name");
      return;
    } 
     try {
      const API_KEY = import.meta.env.VITE_APP_ID; // API Key को चेक करें
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok ) {
      alert(data.message);
        return;
      }

    
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    }catch (error) { 
      setWeatherData(false)
      console.error("Error fetching weather data:", error);  }
  };
  useEffect(() => {
    search("london");
  },[]);
  return (
    <div className="home">
      <div className="seach-bar">
        <input type="text" ref={inputRef} placeholder="Search" />
        <img src={search_icon} alt="" onClick={() =>search(inputRef.current.value)}/>
      </div>
    {weatherData?<>
    
  
      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperauture"> {weatherData.temperature}&deg;C</p>
      <p className="location ">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windspeed} km/h</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather;

