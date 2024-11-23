import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

function Map1() {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RydWRhbCIsImEiOiJja2U2d2wyd2IxaDd1MnJ1bDdpc3d5czhjIn0.CK_h23BOqoBtGYEqW1tuhQ';
        
        // Initialize map with India's default location
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [78.9629, 20.5937], // Default center to India [lng, lat]
            zoom: 5 // starting zoom
        });

        // Attempt to set the map center to the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.setCenter([longitude, latitude]); // Update map center to user's location
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                }
            );
        }

        map.on('load', () => {
            map.addSource('portland', {
                'type': 'raster',
                'url': 'https://shadowmap.s3.amazonaws.com/SHADE-GE-22JUN-10am/22JUNE-10AM+-Model-1.tif'
            });

            map.addLayer({
                'id': 'portland',
                'source': 'portland',
                'type': 'raster'
            });
        });

        // Cleanup map when the component unmounts
        return () => map.remove();
    }, []);

    return (
        <div className='card-dashboard'>
            
            <div id="map" style={{ width: '100%', height: '600px' }}></div>
        </div>
    );
}

export default Map1;
