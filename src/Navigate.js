import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import image from './images/image.png'

const NavigationMap = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [userLocation, setUserLocation] = useState([28.2380, 83.9956]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(userLocation, 11);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);

      const taxiIcon = L.icon({
        iconUrl: image, // Ensure correct path
        iconSize: [70, 70],
        errorOverlayUrl: '', // Optional: Fallback if path fails
      });

      console.log("Using icon URL:", taxiIcon.options.iconUrl);

      markerRef.current = L.marker(userLocation, { icon: taxiIcon }).addTo(mapRef.current);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          mapRef.current.setView(newLocation, 11);
          markerRef.current.setLatLng(newLocation);
        },
        () => console.error("Unable to retrieve your location")
      );

      mapRef.current.on('click', (e) => {
        const destination = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mapRef.current);

        L.Routing.control({
          waypoints: [
            L.latLng(userLocation[0], userLocation[1]),
            L.latLng(e.latlng.lat, e.latlng.lng),
          ],
        })
          .on('routesfound', function (event) {
            const routes = event.routes[0].coordinates;

            routes.forEach((coord, index) => {
              setTimeout(() => {
                markerRef.current.setLatLng([coord.lat, coord.lng]);
              }, 100 * index);
            });
          })
          .addTo(mapRef.current);
      });
    }
  }, [userLocation]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default NavigationMap;
