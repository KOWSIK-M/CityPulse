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

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location);
  }, [location]);
  return null;
};

const CityMap = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location

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
      return data.display_name; // Location name
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown location";
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: markers.length,
          position: e.latlng,
          feedback: "",
          rating: 0,
        };
        setMarkers([...markers, newMarker]);
      },
    });
    return null;
  };

  const handleFeedbackChange = (e, id) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id ? { ...marker, feedback: e.target.value } : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleRatingChange = (e, id) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id ? { ...marker, rating: e.target.value } : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleSubmit = async (id) => {
    const marker = markers.find((marker) => marker.id === id);
    if (marker) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        console.error("User data not found in local storage.");
        return;
      }

      const locationName = await fetchLocationName(
        marker.position.lat,
        marker.position.lng
      );

      const feedbackData = {
        user_id: userData.id,
        fusername: userData.username,
        femail: userData.email,
        city: locationName.split(",")[0] || userData.city, // Extract city or fallback to user's city
        location: locationName,
        feedback: marker.feedback,
        rating: marker.rating,
      };

      try {
        const response = await axiosInstance.post("/feedbacks", feedbackData);
        console.log("Feedback submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
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
      <p>
        After updating, reviews will be sent to your email
        <span style={{ color: "#ff7782" }}> Please check it out later</span>
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
                    <option value="0">Select rating🔽</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </label>
                <p>Rating: {marker.rating} / 5</p>
                <p>Feedback: {marker.feedback}</p>
                <button
                  onClick={() => handleSubmit(marker.id)}
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
