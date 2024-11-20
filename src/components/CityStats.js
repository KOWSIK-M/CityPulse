import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../UserDashboard.css';

const CityStats = ({ location, cityInfo, customIcon }) => {
  return (
    <div className="card-dashboard">
      <h2>City Stats</h2>
      <MapContainer center={location} zoom={12} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={location} icon={customIcon}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
      <ul className="stats-list">
        <li>Population: {cityInfo?.population || "Loading..."}</li>
        <li>Elevation: {cityInfo?.elevationMeters || "Unknown"} meters</li>
        <li>Timezone: {cityInfo?.timezone || "N/A"}</li>
      </ul>
    </div>
  );
};

export default CityStats;
