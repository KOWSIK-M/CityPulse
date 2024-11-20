import React from 'react';
import '../UserDashboard.css'

const TouristPlaces = ({ touristPlaces }) => {

  return (
    <div className="card-dashboard">
      <h2>Tourist Places</h2>
      <div className="scroll-container">
        <ul>
          {touristPlaces?.length > 0 ? (
            touristPlaces.map((place, index) => (
              <li className='li-tourist' key={index}>{place.tags.name}</li>
            ))
          ) : (
            <li>No tourist places found</li>
          )}
        </ul>
      </div>

    </div>
  );
};

export default TouristPlaces;
