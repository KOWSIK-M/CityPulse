import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import taxiIconUrl from "../images/car.png";

// Fix for missing default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Navigate() {
  const [routeControl, setRouteControl] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = L.map("map").setView([28.238, 83.9956], 11);
    setMap(map); // Store map reference

    // Add tile layer
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: `Leaflet &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a>, contribution`,
      maxZoom: 18,
    }).addTo(map);

    // Define custom taxi icon
    const taxiIcon = L.icon({
      iconUrl: taxiIconUrl,
      iconSize: [70, 70],
    });

    // Geolocation to set user location and add the taxi marker
    let userLocation = [28.238, 83.9956]; // Default fallback location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation = [latitude, longitude];
          map.setView(userLocation, 13);
          L.marker(userLocation, { icon: taxiIcon }).addTo(map);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }

    // Handle map click for adding routes and markers
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      // Add a marker at the clicked location
      L.marker([lat, lng]).addTo(map);

      // Add routing from user location to the clicked location
      const newRouteControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]), // User's location
          L.latLng(lat, lng), // Clicked location
        ],
        createMarker: () => null, // Prevents default markers from showing
      })
        .on("routesfound", (event) => {
          const routes = event.routes;

          // Animate the taxi icon along the route
          const marker = L.marker(userLocation, { icon: taxiIcon }).addTo(map);
          routes[0].coordinates.forEach((coord, index) => {
            setTimeout(() => {
              marker.setLatLng([coord.lat, coord.lng]);
            }, 100 * index);
          });
        })
        .addTo(map);

      // Store the reference to the routeControl
      setRouteControl(newRouteControl);
    });
  }, []);

  const clearRoutes = () => {
    if (routeControl) {
      map.removeControl(routeControl); // This removes the routing control from the map
      setRouteControl(null); // Reset the route control state
    }
  };

  return (
    <div>
      <button
        onClick={clearRoutes}
        style={{
          position: "absolute",
          top: 30,
          left: 280,
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#ff5733",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear Routes
      </button>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
