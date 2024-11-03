import React from 'react'
import { createMap, useMap } from 'maps-api';

const mapObject = createMap({}); // Initialize the map using the Maps API


function Example() {

  const [MapBox, map] = useMap(mapObject, {
    onLoad: (map) => {
      const marker = map.createMarker([50.0, 14.0], () => {
        return <div>Marker</div>; // You can customize the marker content
      });
      marker.initialize(); // Initialize the marker
    }
  });

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <MapBox>
        {/* You can add additional components to display on the map here */}
      </MapBox>
    </div>
  );
}
export default Example;