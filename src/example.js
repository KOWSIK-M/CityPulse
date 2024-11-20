import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CitySearchMap from './components/CitySearch';
import RoadsOnlyMap from './components/Roads';
import RiversOnlyMap from './components/Rivers';

// Define a custom icon (replace the URL with any other icon URL)
const customIcon = new L.Icon({
  iconUrl: 'https://example.com/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

// Component to handle re-centering
const RecenterMap = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(marker => marker.position));
      map.fitBounds(bounds);
    }
  }, [markers, map]);

  return null;
};

const CityMap1 = () => {
  const [selectedCategory, setSelectedCategory] = useState("none"); // Default to "none"
  const [customQuery, setCustomQuery] = useState("");
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location
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

  // Fetch Overpass data based on category or custom query
  const fetchOverpassData = async (query) => {
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.elements.length === 0) {
        setErrorMessage("No results found for the selected category or query.");
      } else {
        setErrorMessage(""); // Clear error message
      }

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

  // Handle data fetching whenever the category or custom query changes
  useEffect(() => {
    if (selectedCategory === "none" && !customQuery) {
      setMarkers([]);
      return;
    }

    // Define Overpass API queries for each category
    const queries = {
      rivers: `[out:json];way["waterway"="river"](around:10000, ${userLocation[0]}, ${userLocation[1]});out geom;`,
      forests: `[out:json];way["landuse"="forest"](around:10000, ${userLocation[0]}, ${userLocation[1]});out geom;`,
      hotels: `[out:json];node["tourism"="hotel"](around:10000, ${userLocation[0]}, ${userLocation[1]});out;`,
      amenities: `[out:json];node["amenity"](around:10000, ${userLocation[0]}, ${userLocation[1]});out;`
    };

    // Custom query for user input
    const customQueryTemplate = `[out:json];node["${customQuery}"](around:10000, ${userLocation[0]}, ${userLocation[1]});out body;`;

    // Determine the query based on selection
    const query = customQuery
      ? customQueryTemplate
      : queries[selectedCategory];

    if (query) {
      fetchOverpassData(query);
    }
  }, [selectedCategory, customQuery, userLocation]);

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCustomQuery(""); // Clear custom query when a category is selected
  };

  // Handle custom query input
  const handleCustomQueryChange = (e) => {
    setCustomQuery(e.target.value);
    setSelectedCategory("none"); // Set category to "none" when using a custom query
  };

  return (
    <div>
      <div>
        <label>
          Select Category:
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="none">None</option>
            <option value="rivers">Rivers</option>
            <option value="forests">Forests</option>
            <option value="hotels">Hotels</option>
            <option value="amenities">Public Amenities</option>
          </select>
        </label>
        
        <label>
          Custom Query:
          <input
            type="text"
            placeholder="e.g., school, cafe, bus_station"
            value={customQuery}
            onChange={handleCustomQueryChange}
          />
        </label>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <MapContainer center={userLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <RecenterMap markers={markers} />
        
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>{marker.name || "Unknown"}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <CitySearchMap/>
      <RoadsOnlyMap></RoadsOnlyMap>
      <RiversOnlyMap/>
    </div>
  );
};

export default CityMap1;
