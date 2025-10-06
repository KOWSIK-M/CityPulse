// src/Dashboard/WeatherDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";
import "./WeatherDetails.css";

function WeatherDetails() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Your OpenWeather API key
  const location = useLocation();
  const city = location.state?.city || "Guntur"; // Default to Guntur if city not provided

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, city]);

  const getBackgroundClass = () => {
    if (!weather) return "default-bg";
    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes("rain")) return "rain-bg";
    if (mainWeather.includes("cloud")) return "cloud-bg";
    if (mainWeather.includes("clear")) return "clear-bg";
    return "default-bg";
  };

  if (loading) {
    return <Loader />;
  }

  if (!weather || weather.cod !== 200) {
    return <div className="error">⚠️ Weather data not available.</div>;
  }

  return (
    <div className={`weather-details-container ${getBackgroundClass()}`}>
      <div className="weather-header">
        <h1>{weather.name}</h1>
        <p className="date">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="weather-content">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className="weather-info">
          <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          <div className="weather-details">
            <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {Math.round(weather.wind.speed)} m/s</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Visibility: {(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Powered by OpenWeather</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
