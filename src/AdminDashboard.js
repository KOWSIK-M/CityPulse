import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import Logo from "./images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faBorderAll,
  faComments,
  faMoon,
  faSun,
  faThumbsUp,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Clock from "./components/Clock";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Loader from "./components/Loader";
import ChatBot from "./components/ChatBot";
import ScrollTop from "./components/ScrollTop";
import UsersSummary from "./components/UsersSummary";
import ApproveVistas from "./components/ApproveVistas";
import AllFeedbacks from "./components/AllFeedbacks";
import AllUsers from "./components/AllUsers";
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const cityCenter = [17.385, 78.4867];
  const [location, setLocation] = useState(cityCenter);
  const [location_now, setLocation_now] = useState(cityCenter);
  const [city, setCity] = useState("Vijayawada"); // Default city
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve and decode the JWT token
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.sub); // Set the role from the token
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");

    navigate("/CityPulse/adminlogin");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);

    // If userData has city, fetch the coordinates of that city
    if (user && user.city) {
      setCity(user.city);
    } else if (user && user.coordinates) {
      setLocation(user.coordinates);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setLocation_now(userLocation); // Update location state
        },
        (error) => console.error("Error retrieving location:", error)
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  // Set custom marker icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Recenter the map to the given location
  const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 12);
    }, [center, map]);
    return null;
  };

  if (loading) {
    return <Loader />;
  }
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Dashboard />;
      case "approve":
        return <ApproveVistas />;
      case "all-vistas":
        return <AllFeedbacks />;
      case "all-users":
        return <AllUsers />;
      default:
        return <UsersSummary />;
    }
  };
  function Menu() {
    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");

    menuBtn.addEventListener("click", () => {
      sideMenu.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      sideMenu.style.display = "none";
    });
  }

  function ToggleColors() {
    const themeToggler = document.querySelector(".theme-toggler");

    themeToggler.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme-variables");

      themeToggler.querySelector("div:nth-child(1)").classList.toggle("active");
      themeToggler.querySelector("div:nth-child(2)").classList.toggle("active");
    });
  }
  return (
    <div>
      <div className="container-dashboard">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={Logo} className="img-dashboard" alt="" />
              <h2>
                City<span className="danger">Pulse</span>
              </h2>
            </div>
            <div className="close" id="close-btn">
              <span className="icons">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          </div>

          <div className="sidebar">
            <NavLink
              className="navlinks"
              onClick={() => setActiveSection("dashboard")}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faBorderAll} />
              </span>
              <h3>Dashboard</h3>
            </NavLink>

            <NavLink
              className="navlinks"
              onClick={() => setActiveSection("approve")}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faThumbsUp} />
              </span>
              <h3>ApproveVistas</h3>
            </NavLink>
            <NavLink
              className="navlinks"
              onClick={() => setActiveSection("all-vistas")}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faComments} />
              </span>
              <h3>All Vistas</h3>
            </NavLink>
            <NavLink
              className="navlinks"
              onClick={() => setActiveSection("all-users")}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              <h3>All Users</h3>
            </NavLink>
            <NavLink
              className="navlinks"
              onClick={() => setActiveSection("profile")}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <h3>Profile</h3>
            </NavLink>
            <NavLink
              className="navlinks"
              onClick={(event) => {
                event.preventDefault(); // Prevent default navigation
                logout(); // Call logout function
              }}
            >
              <span className="icons">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
              <h3>Logout</h3>
            </NavLink>
          </div>
        </aside>
        {/*------------------ End of Aside------------------*/}
        <main>{renderSection()}</main>
        {/* -----------------End of Main-------------------- */}
        <div className="right">
          <div className="top">
            <button id="menu-btn" className="button-menu" onClick={Menu}>
              <FontAwesomeIcon icon={faBars} />
              Menu
            </button>
            <div className="theme-toggler" onClick={ToggleColors}>
              <div className="active">
                <span>
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faSun} />
                  &nbsp;&nbsp;
                </span>
              </div>
              <div>
                <span>
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faMoon} />
                  &nbsp;&nbsp;
                </span>
              </div>
            </div>
            <div className="profile">
              <div className="info">
                <p>
                  Hey, <b>{userRole || "Loading..."}</b>
                </p>
              </div>
              <div className="profile-photo">
                <img
                  src={userData?.photoUrl || "/default-profile.png"}
                  alt="profile"
                />
              </div>
            </div>

            <ChatBot />
            <ScrollTop />

            {/*-------------End Of Top------------------- */}
          </div>

          <div style={{ marginTop: "10rem" }}>
            <Clock />
          </div>
          <div className="map-right card-dashboard">
            <h3>
              You are here{" "}
              <img src={markerIcon} alt="icon" style={{ height: "20px" }}></img>
            </h3>
            <MapContainer
              center={location_now}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {location_now && <RecenterMap center={location_now} />}
              <Marker position={location_now} icon={customIcon}>
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>
            <div
              className="card-dashboard"
              style={{ marginTop: "10px", textDecoration: "none" }}
            >
              <NavLink
                onClick={() => setActiveSection("map1")}
                style={{
                  textDecoration: "none",
                  fontSize: "1.7rem",
                  color: "#ff7782",
                }}
              >
                Want to see globe view?
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
