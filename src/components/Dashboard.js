import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';
import CityStats from './CityStats';
import NearbyCities from './NearbyCities';
import TouristPlaces from './TouristPlaces';


import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Dashboard = () => {
  const cityCenter = [17.3850, 78.4867];
  const [location, setLocation] = useState(cityCenter);
  const [cityInfo, setCityInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [cityNews, setCityNews] = useState([]);
  const [cityImages, setCityImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);

  const apiKey = "b848742b8067474bbc4a922dc41b0a4a"; // OpenWeather API key
  const rapidApiKey = "bd851d75e9msh8a0e424af3b7de3p1153b7jsnb624a5da620f";
  const city = "Vijayawada"; // Default city

  // Fetch user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation([position.coords.latitude, position.coords.longitude]),
      (error) => console.error("Error retrieving location:", error)
    );
  }, []);

  // Set custom marker icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Fetch city-related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        // Fetch AQI data
        const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}`);
        const aqiData = await aqiResponse.json();
        setAqi(aqiData);

        // Fetch city info
        const cityInfoResponse = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q200017`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        });
        const cityInfoData = await cityInfoResponse.json();
        setCityInfo(cityInfoData.data);

        // Overpass API query for nearby cities (optional)
        const nearbyCitiesQuery = `[out:json];node["place"="city"](around:50000,${location[0]},${location[1]});out;`;
        const nearbyCitiesResponse = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(nearbyCitiesQuery)}`);
        const nearbyCitiesData = await nearbyCitiesResponse.json();
        setNearbyPlaces(nearbyCitiesData.elements);

        // Fetch News for Vijayawada
        const newsResponse = await fetch(`https://newsapi.org/v2/everything?q=Vijayawada&apiKey=fa198e3599464930b2eccad7a8fdb736`);
        const newsData = await newsResponse.json();
        setCityNews(newsData.articles);

        // Fetch City Images
        const imagesResponse = await fetch(`https://api.unsplash.com/search/photos?query=Vijayawada&client_id=4rDEFf3xFKi_8VeKPMVWjdA21d73zo0lpMxD1DGmerQ`);
        const imagesData = await imagesResponse.json();
        setCityImages(imagesData.results);

        // Fetch Tourist Places using OpenStreetMap Overpass API
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"](around:1000,${location[0]},${location[1]});way["tourism"](around:10000,${location[0]},${location[1]});relation["tourism"](around:1000,${location[0]},${location[1]}););out;`;
        const touristResponse = await fetch(overpassUrl);
        const touristData = await touristResponse.json();
        setTouristPlaces(touristData.elements.filter(element => element.tags && element.tags.name));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, location, apiKey, rapidApiKey]);

  if (loading) {
    return <div className="loading">🌤️ Loading Data...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Hello, my fellow Vijayawada resident!</h3>
      <p>Know about your City more</p>

      <section className="dashboard-content">
        <CityStats location={location} cityInfo={cityInfo} customIcon={customIcon} />
        <NearbyCities nearbyPlaces={nearbyPlaces} />
        <TouristPlaces touristPlaces={touristPlaces} />
      </section>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Weather</div>
              <div className="ag-courses-item_date-box">Temperature:
                <span className="ag-courses-item_temp">
                  <div>{Math.round(weather.main.temp)}°C</div>
                </span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Air Quality Index</div>
              <div className="ag-courses-item_date-box">AQI Level:
                <span className="ag-courses-item_aqi">
                  <div className="aqi">
                    {aqi?.list?.[0]?.main.aqi || "N/A"}
                  </div>
                </span>
              </div>
            </a>
          </div>
          
          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Community Forum</div>
              <div className="ag-courses-item_date-box">Start: 04.11.2022</div>
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
