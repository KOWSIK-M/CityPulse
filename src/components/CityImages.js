import React from 'react';
import '../UserDashboard.css'

const CityImages = ({ cityImages }) => {
  return (
    <div className="card-dashboard">
      <h2>City Images</h2>
      <div className="image-gallery">
        {cityImages?.length > 0 ? (
          cityImages.map((image, index) => (
            <img className='img-gallery-images' key={index} src={image.urls.small} alt={image.alt_description} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default CityImages;
