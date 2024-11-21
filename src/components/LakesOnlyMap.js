import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from './RecenterMap';

const LakesOnlyMap = () => {
  const [center, setCenter] = useState([20, 0]); // Default location
  const [lakes, setLakes] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const fetchLakes = async () => {
        const query = `[out:json];node["natural"="water"](bbox);out;`; // Fetch lakes only
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          const lakeMarkers = data.elements.map((element) => [element.lat, element.lon]);
          setLakes(lakeMarkers);
        } catch (error) {
          console.error('Error fetching lakes:', error);
        }
      };
      
    fetchLakes();
  }, []);

  return (
    <MapContainer center={center} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <RecenterMap center={center} />
      {lakes.map((position, idx) => (
        <Marker key={idx} position={position} />
      ))}
    </MapContainer>
  );
};

export default LakesOnlyMap;
