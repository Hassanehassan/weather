import React, { useRef, useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  let api_key = "7995a89fa9d01c201105085852db7cea";
  const [wicon, setWicon] = useState(cloud_icon);

  const cityRef = useRef(null);
  const tempRef = useRef(null);
  const nameRef = useRef(null);
  const humidityRef = useRef(null);
  const windRef = useRef(null);

  const search = async () => {
    let element = cityRef.current.value;
    if (element.length === 0) {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    tempRef.current.innerHTML = Math.floor(data.main.temp - 273.15) + "°C";
    nameRef.current.innerHTML = data.name;
    humidityRef.current.innerHTML = data.main.humidity + " %";
    windRef.current.innerHTML = Math.floor(data.wind.speed) + " km/h";

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };
  return (
    <div className="superContainer">
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search"
            ref={cityRef}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather_image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather_temp" ref={tempRef}>
          24°C
        </div>
        <div className="weather_location" ref={nameRef}>
          London
        </div>
        <div className="data_container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity_percent" ref={humidityRef}>
                64%
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity_percent" ref={windRef}>
                18 km/h
              </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
