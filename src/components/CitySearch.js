import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CitySearchMap = () => {
  const [location, setLocation] = useState([20, 0]); // Default global view
  const [searchQuery, setSearchQuery] = useState("");

  // Component to re-center the map
  const RecenterMap = ({ center }) => {
    const map = useMap();
    map.setView(center, 13);
    return null;
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Failed to fetch location data", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city or country"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <MapContainer center={location} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <RecenterMap center={location} />
      </MapContainer>
    </div>
  );
};

export default CitySearchMap;
