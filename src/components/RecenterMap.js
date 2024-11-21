import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

export default RecenterMap;
