import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RoadsOnlyMap = () => (
  <MapContainer center={[20, 0]} zoom={5} style={{ height: "500px", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    />
  </MapContainer>
);

export default RoadsOnlyMap;
