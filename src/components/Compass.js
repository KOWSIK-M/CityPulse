import React, { useEffect, useState } from 'react';
import './Compass.css';

const Compass = () => {
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
          }
        } catch (error) {
          console.error('Permission denied:', error);
        }
      } else {
        setPermissionGranted(true); // For browsers not requiring explicit permission
      }
    };

    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        setHeading(event.alpha); // Device's heading in degrees
      }
    };

    if (permissionGranted) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [permissionGranted]);

  return (
    <div className="compass-container card-dashboard">
      {!permissionGranted && (
        <button className="compass-button" onClick={() => setPermissionGranted(true)}>
          Enable Compass
        </button>
      )}
      {permissionGranted && (
        <>
          <div
            className="compass"
            style={{
              transform: `rotate(${-heading}deg)`,
            }}
          >
            <div className="compass-pointer">N</div>
          </div>
          <p className="compass-heading">Heading: {Math.round(heading)}°</p>
        </>
      )}
    </div>
  );
};

export default Compass;
