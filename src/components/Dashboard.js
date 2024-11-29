import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";
import CityStats from "./CityStats";
import NearbyCities from "./NearbyCities";
import TouristPlaces from "./TouristPlaces";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify"; // Importing react-toastify

// Import Toastify CSS
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [location, setLocation] = useState([17.385, 78.4867]); // Default city coordinates (Vijayawada)
  const [cityInfo, setCityInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [userData, setUserData] = useState(null);

  const apiKey = "b848742b8067474bbc4a922dc41b0a4a"; // OpenWeather API key
  const rapidApiKey = "bd851d75e9msh8a0e424af3b7de3p1153b7jsnb624a5da620f";
  const [city, setCity] = useState("Vijayawada"); // Default city
  const [cityCoordinates, setCityCoordinates] = useState([17.385, 78.4867]); // Default coordinates

  // Set custom marker icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Fetch user's current location or set city location based on user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);

    // If userData has city, fetch the coordinates of that city
    if (user && user.city) {
      setCity(user.city);
      fetchCityCoordinates(user.city);
    } else if (user && user.coordinates) {
      setLocation(user.coordinates);
      setCityCoordinates(user.coordinates); // Fallback to user coordinates
    }
  }, []);

  // Fetch coordinates for the city
  const fetchCityCoordinates = async (cityName) => {
    const geocodeApiKey = "aae1cfd2378d26601e660d3e647710fc"; // OpenWeather API key for geo data
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${geocodeApiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0]; // Use the first city match

        setCityCoordinates([lat, lon]);
        setLocation([lat, lon]); // Set the map's center to the city coordinates
      } else {
        console.error("City not found");
      }
    } catch (error) {
      toast.error("Error fetching city coordinates");
      console.error("Error fetching city coordinates:", error);
    }
  };

  // Fetch city-related data (weather, AQI, etc.) when city or location changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!weatherResponse.ok) throw new Error("Weather API failed");
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        // Fetch AQI data
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}`
        );
        if (!aqiResponse.ok) throw new Error("AQI API failed");
        const aqiData = await aqiResponse.json();
        setAqi(aqiData);

        // Fetch city info
        const cityInfoResponse = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${city}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        if (!cityInfoResponse.ok) throw new Error("City info API failed");
        const cityInfoData = await cityInfoResponse.json();
        setCityInfo(cityInfoData.data);

        // Overpass API query for nearby cities (optional)
        const nearbyCitiesQuery = `[out:json];node["place"="city"](around:50000,${location[0]},${location[1]});out;`;
        const nearbyCitiesResponse = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
            nearbyCitiesQuery
          )}`
        );
        if (!nearbyCitiesResponse.ok)
          throw new Error("Nearby cities API failed");
        const nearbyCitiesData = await nearbyCitiesResponse.json();
        setNearbyPlaces(nearbyCitiesData.elements);

        // Fetch Tourist Places using OpenStreetMap Overpass API
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"](around:1000,${location[0]},${location[1]});way["tourism"](around:10000,${location[0]},${location[1]});relation["tourism"](around:1000,${location[0]},${location[1]}););out;`;
        const touristResponse = await fetch(overpassUrl);
        if (!touristResponse.ok) throw new Error("Tourist places API failed");
        const touristData = await touristResponse.json();
        setTouristPlaces(
          touristData.elements.filter(
            (element) => element.tags && element.tags.name
          )
        );
      } catch (error) {
        toast.error(`Error fetching data: ${error.message}`);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data after location or city is set
    if (cityCoordinates[0] && cityCoordinates[1]) {
      fetchData();
    }
  }, [city, location, cityCoordinates, apiKey, rapidApiKey]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>
        Hello, my fellow{" "}
        <span className="city">{userData ? userData.city : "Loading..."}</span>{" "}
        resident!
      </h3>
      <h3>
        Know about your City more with{" "}
        <span style={{ fontWeight: "800" }}>
          City<span style={{ color: "#ff7782" }}>Pulse</span>
        </span>
      </h3>

      <section className="dashboard-content">
        <CityStats
          location={location}
          cityInfo={cityInfo}
          customIcon={customIcon}
        />
        <NearbyCities nearbyPlaces={nearbyPlaces} />
        <TouristPlaces touristPlaces={touristPlaces} />
      </section>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <NavLink className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Weather</div>
              <div className="ag-courses-item_date-box">
                Temperature:
                <span className="ag-courses-item_temp">
                  <div>{Math.round(weather.main.temp)}°C</div>
                </span>
              </div>
            </NavLink>
          </div>

          <div className="ag-courses_item">
            <NavLink className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Air Quality Index</div>
              <div className="ag-courses-item_date-box">
                AQI Level:
                <span className="ag-courses-item_temp">
                  {aqi.list[0].main.aqi}
                </span>
              </div>
            </NavLink>
          </div>
          <div className="ag-courses_item">
            <NavLink className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Community Forum</div>
              <div className="ag-courses-item_date-box">
                Latest Feedback:{" "}
                <span className="ag-courses-item_temp">
                  {/* Display latest feedback here */}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
