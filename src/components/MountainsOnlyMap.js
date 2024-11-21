import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from './RecenterMap';

const MountainsOnlyMap = () => {
  const [center, setCenter] = useState([20, 0]); // Default location
  const [mountains, setMountains] = useState([]);

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
    const fetchMountains = async () => {
      const query = `[out:json];node["natural"="peak"](bbox);out;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const mountainPoints = data.elements.map((element) => ({
          position: [element.lat, element.lon],
          name: element.tags?.name || 'Unknown Peak',
        }));
        setMountains(mountainPoints);
      } catch (error) {
        console.error('Error fetching mountains:', error);
      }
    };

    fetchMountains();
  }, []);

  return (
    <MapContainer center={center} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <RecenterMap center={center} />
      {mountains.map((mountain, idx) => (
        <Circle
          key={idx}
          center={mountain.position}
          radius={100}
          color="brown"
          fillOpacity={0.5}
        >
          <title>{mountain.name}</title>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MountainsOnlyMap;
