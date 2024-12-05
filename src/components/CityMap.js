import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./CityMap.css";
import axiosInstance from "./AxiosInstance";
import { jwtDecode } from "jwt-decode";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Recenter map to user's location
const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location);
  }, [location, map]);
  return null;
};

// Reverse geocode API call using OpenCage
const fetchCityFromCoordinates = async (lat, lng) => {
  try {
    const apiKey = "e0e38e0f1e984739a57706965353bb45"; // Replace with your OpenCage API key
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results[0]) {
      // Extract the city name from the address components
      const city =
        data.results[0].components.city ||
        data.results[0].components.town ||
        "Unknown City";
      return city;
    }
    return "Unknown City";
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unknown City";
  }
};

const CityMap = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        console.error("Location access denied or unavailable");
      }
    );
  }, []);
  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      return data.display_name || "Unknown location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown location";
    }
  };
  // Handle map click event to add a marker
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const locationName = await fetchLocationName(
          e.latlng.lat,
          e.latlng.lng
        );
        const city = await fetchCityFromCoordinates(e.latlng.lat, e.latlng.lng);
        const newMarker = {
          id: markers.length,
          position: e.latlng,
          cityName: city, // Use city name from geocoding API
          locationName,
          feedback: "",
          rating: 0,
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      },
    });
    return null;
  };

  // Handle feedback change
  const handleFeedbackChange = (e, id) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id ? { ...marker, feedback: e.target.value } : marker
    );
    setMarkers(updatedMarkers);
  };

  // Handle rating change
  const handleRatingChange = (e, id) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id
        ? { ...marker, rating: parseInt(e.target.value) }
        : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleSubmit = async (marker) => {
    try {
      if (!marker.feedback || marker.rating === 0) {
        console.error("Feedback or rating is missing");
        return;
      }

      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const femail = decodedToken.sub;

        // Ensure the city is correct
        const city = marker.cityName || "Unknown City"; // City from reverse geocoding API

        const feedbackData = {
          femail,
          city, // Store the city name here
          location: marker.locationName || "Unknown loc", // Store the original location name here
          feedback: marker.feedback,
          rating: marker.rating,
        };

        const response = await axiosInstance.post("/feedbacks", feedbackData);
        if (response.status === 200) {
          console.log("Feedback submitted successfully");
        } else {
          console.error("Failed to submit feedback to the backend");
        }
      }
    } catch (error) {
      console.error("Error while submitting feedback:", error);
    }
  };

  return (
    <div className="card-dashboard">
      <h2>Pin any place you wish</h2>
      <h3>and Give your valuable feedbacks</h3>
      <h3>We Value your Opinion 😊</h3>

      <p>
        Please provide honest and accurate feedback. Avoid posting fake reviews,
        as they can negatively impact the city's reputation.
      </p>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <RecenterMap location={userLocation} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup style={{ width: "200px" }}>
              <div className="feedback-div">
                <label>
                  Feedback: &nbsp;&nbsp;
                  <textarea
                    className="feedback-text"
                    value={marker.feedback}
                    onChange={(e) => handleFeedbackChange(e, marker.id)}
                    placeholder="Enter your feedback here"
                  />
                </label>
                <br />
                <label>
                  Rating:&nbsp;&nbsp;
                  <select
                    className="feedback-rating"
                    value={marker.rating}
                    onChange={(e) => handleRatingChange(e, marker.id)}
                  >
                    <option value="0">Select rating 🔽</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </label>
                <button
                  onClick={() => handleSubmit(marker)} // Pass the whole marker object
                  className="feedback-button"
                >
                  Submit Feedback
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityMap;
