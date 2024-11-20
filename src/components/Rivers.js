import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RiversOnlyMap = () => {
  const [rivers, setRivers] = useState([]);

  useEffect(() => {
    const fetchRivers = async () => {
      const query = `[out:json];way["waterway"="river"](bbox);out geom;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const riverPolylines = data.elements.map(element => element.geometry.map(point => [point.lat, point.lon]));
        setRivers(riverPolylines);
      } catch (error) {
        console.error("Error fetching rivers", error);
      }
    };

    fetchRivers();
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {rivers.map((polyline, idx) => (
        <Polyline key={idx} positions={polyline} color="blue" weight={3} />
      ))}
    </MapContainer>
  );
};

export default RiversOnlyMap;
