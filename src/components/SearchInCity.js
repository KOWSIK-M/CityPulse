import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../UserDashboard.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import RecenterMap from './RecenterMap';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const SearchInCity = () => {
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [customQuery, setCustomQuery] = useState("");
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState([51.505, -0.09]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        console.error('Location access denied or unavailable');
      }
    );
  }, []);

  // Fetch Overpass data
  const fetchOverpassData = async (query) => {
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.elements.length === 0) {
        setErrorMessage("No results found for the selected category or query.");
        setMarkers([]);
        return;
      }

      setErrorMessage("");
      const newMarkers = data.elements.map((element) => ({
        id: element.id,
        name: element.tags.name || selectedCategory,
        position: element.type === 'node'
          ? [element.lat, element.lon]
          : [element.geometry[0].lat, element.geometry[0].lon],
      }));
      setMarkers(newMarkers);
    } catch (error) {
      console.error("Failed to fetch data from Overpass API", error);
      setErrorMessage("An error occurred while fetching data. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedCategory === "none" && !customQuery) {
      setMarkers([]);
      return;
    }

    const queries = {
      rivers: `[out:json];way["waterway"="river"](around:10000, ${userLocation[0]}, ${userLocation[1]});out geom;`,
      forests: `[out:json];way["landuse"="forest"](around:10000, ${userLocation[0]}, ${userLocation[1]});out geom;`,
      hotels: `[out:json];node["tourism"="hotel"](around:10000, ${userLocation[0]}, ${userLocation[1]});out;`,
      amenities: `[out:json];node["amenity"](around:10000, ${userLocation[0]}, ${userLocation[1]});out;`,
    };

    const customQueryTemplate = `[out:json];node["${customQuery}"](around:10000, ${userLocation[0]}, ${userLocation[1]});out body;`;
    const query = customQuery ? customQueryTemplate : queries[selectedCategory];

    if (query) fetchOverpassData(query);
  }, [selectedCategory, customQuery, userLocation]);

  return (
    <div className='card-dashboard'>
      <h2>Search a place you want to go -`{'>'}`</h2>
      <div className="category-query-container">
        <label className="category-label">
          Select Category:
          <select
            className="category-select"
            onChange={(e) => { setSelectedCategory(e.target.value); setCustomQuery(""); }}
            value={selectedCategory}
          >
            <option value="none">None</option>
            <option value="rivers">Rivers</option>
            <option value="forests">Forests</option>
            <option value="hotels">Hotels</option>
            <option value="amenities">Public Amenities</option>
          </select>
        </label>

        <label className="query-label">
          Custom Query:
          <input
            className="query-input"
            type="text"
            placeholder="e.g., school, cafe, bus_station"
            value={customQuery}
            onChange={(e) => { setCustomQuery(e.target.value); setSelectedCategory("none"); }}
          />
        </label>
      </div>

      <br />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <MapContainer center={userLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <RecenterMap center={userLocation} />

        {markers.map(marker => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>{marker.name || "Unknown"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SearchInCity;
