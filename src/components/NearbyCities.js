import React from 'react';

const NearbyCities = ({ nearbyPlaces }) => {
  return (
    <div className="card-dashboard">
      <h2>Nearby Cities</h2>
      <ul>
        {nearbyPlaces?.length > 0 ? (
          nearbyPlaces.map((place, index) => (
            <li key={index}>
              <strong>{place.tags?.name || "Unnamed city"}</strong>
              <br />
              Latitude: {place.lat}, Longitude: {place.lon}
            </li>
          ))
        ) : (
          <li>No nearby cities found</li>
        )}
      </ul>
    </div>
  );
};

export default NearbyCities;
