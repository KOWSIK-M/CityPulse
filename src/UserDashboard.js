import React, { useEffect, useState } from 'react'
import './UserDashboard.css'
import Logo from './images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faBorderAll, faCamera, faComments, faFile, faFlag, faGear, faMap, faMoon, faMountainCity, faNewspaper, faNoteSticky, faRoute, faSun, faUser, faVihara, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CityNews from './components/CityNews';
import Clock from './components/Clock';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Forum from './components/Forum';
import CityImages from './components/CityImages';
import TouristPlaces from './components/TouristPlaces';
import Profile from './components/Profile';
import Navigate from './components/Navigate';
import Compass from './components/Compass';
import AllMaps from './components/AllMaps';

const ButtonStyles = {
  shapeRendering: "geometricPrecision",
  textRendering: "geometricPrecision",
  imageRendering: "optimizeQuality",
  fillRule: "evenodd",
  clipRule: "evenodd"
};



export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cityNews, setCityNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const cityCenter = [17.3850, 78.4867];
  const [location, setLocation] = useState(cityCenter);
  const [cityImages, setCityImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch News for Vijayawada
        const newsResponse = await fetch(`https://newsapi.org/v2/everything?q=Vijayawada&apiKey=fa198e3599464930b2eccad7a8fdb736`);
        const newsData = await newsResponse.json();
        setCityNews(newsData.articles);

        // Fetch City Images
        const imagesResponse = await fetch(`https://api.unsplash.com/search/photos?query=Vijayawada&client_id=4rDEFf3xFKi_8VeKPMVWjdA21d73zo0lpMxD1DGmerQ`);
        const imagesData = await imagesResponse.json();
        setCityImages(imagesData.results);

        // Fetch Tourist Places using OpenStreetMap Overpass API
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"](around:1000,${location[0]},${location[1]});way["tourism"](around:10000,${location[0]},${location[1]});relation["tourism"](around:1000,${location[0]},${location[1]}););out;`;
        const touristResponse = await fetch(overpassUrl);
        const touristData = await touristResponse.json();
        setTouristPlaces(touristData.elements.filter(element => element.tags && element.tags.name));


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.latitude, position.coords.longitude];
          setLocation(userLocation); // Update location state
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

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch City Images
        const imagesResponse = await fetch(`https://api.unsplash.com/search/photos?query=Vijayawada&client_id=4rDEFf3xFKi_8VeKPMVWjdA21d73zo0lpMxD1DGmerQ`);
        const imagesData = await imagesResponse.json();
        setCityImages(imagesData.results);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading Data...</div>;
  }
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Dashboard />;
      case 'news':
        return <CityNews cityNews={cityNews} />;
      case 'all-maps':
          return <AllMaps />;
      case 'forum':
        return <Forum />;
      case 'views':
        return <CityImages cityImages={cityImages} />;
      case 'tourist':
        return <TouristPlaces touristPlaces={touristPlaces} />;
      case 'profile':
        return <Profile />
      case 'navigate':
        return <Navigate />
      default:
        return <Dashboard />;
    }
  };
  function Menu() {
    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");

    menuBtn.addEventListener('click', () => {
      sideMenu.style.display = 'block';
    })

    closeBtn.addEventListener('click', () => {
      sideMenu.style.display = 'none';
    })
  }

  function ToggleColors() {
    const themeToggler = document.querySelector(".theme-toggler");

    themeToggler.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme-variables');

      themeToggler.querySelector('div:nth-child(1)').classList.toggle('active');
      themeToggler.querySelector('div:nth-child(2)').classList.toggle('active');
    })
  }
  return (
    <div>
      <div className="container-dashboard">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={Logo} className="img-dashboard" alt="" />
              <h2>City<span className="danger">Pulse</span></h2>
            </div>
            <div className="close" id="close-btn">
              <span className="icons">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          </div>

          <div className="sidebar">
            <NavLink onClick={() => setActiveSection('dashboard')}>
              <span className="icons">
                <FontAwesomeIcon icon={faBorderAll} />
              </span>
              <h3>Dashboard</h3>
            </NavLink>


            <NavLink onClick={() => setActiveSection('all-maps')}>
              <span className="icons">
                <FontAwesomeIcon icon={faMap} />
              </span>
              <h3>Maps</h3>
            </NavLink>
            <NavLink onClick={() => setActiveSection('navigate')}>
              <span className="icons">
                <FontAwesomeIcon icon={faRoute} />
              </span>
              <h3>CityHop</h3>
            </NavLink>
            <NavLink to="/">
              <span className="icons">
                <FontAwesomeIcon icon={faComments} />
              </span>
              <h3>Feedback</h3>
              <span className="feedback-count">26</span>
            </NavLink>
            <NavLink onClick={() => setActiveSection('news')}>
              <span className="icons">
                <FontAwesomeIcon icon={faNewspaper} />
              </span>
              <h3>News</h3>
            </NavLink>
            <NavLink onClick={() => setActiveSection('forum')}>
              <span className="icons">
                <FontAwesomeIcon icon={faNoteSticky} />
              </span>
              <h3>Community Forum</h3>
            </NavLink>
            <NavLink onClick={() => setActiveSection('views')}>
              <span className="icons">
                <FontAwesomeIcon icon={faCamera} />
              </span>
              <h3>Clicks</h3>
            </NavLink>
            <NavLink onClick={() => setActiveSection('tourist')}>
              <span className="icons">
                <FontAwesomeIcon icon={faMountainCity} />
              </span>
              <h3>Viewpoints</h3>
            </NavLink>
            <NavLink onClick={() => setActiveSection('profile')}>
              <span className="icons">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <h3>Profile</h3>
            </NavLink>
            <NavLink to="/">
              <span className="icons">
                <FontAwesomeIcon icon={faGear} />
              </span>
              <h3>Settings</h3>
            </NavLink>
            <NavLink to="/">
              <span className="icons">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
              <h3>Logout</h3>
            </NavLink>
          </div>
        </aside>
        {/*------------------ End of Aside------------------*/}
        <main>
          {renderSection()}
        </main>
        {/* -----------------End of Main-------------------- */}
        <div className="right">
          <div className="top">
            <button id="menu-btn" className='button-menu' onClick={Menu}>
              <FontAwesomeIcon icon={faBars} />Menu
            </button>
            <button className='premium-btn'>Premium
              <div class="star-1">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
              <div class="star-2">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
              <div class="star-3">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
              <div class="star-4">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
              <div class="star-5">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
              <div class="star-6">
                <svg viewBox="0 0 784.11 815.53" style={ButtonStyles} version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
              </div>
            </button>
            <div className="theme-toggler" onClick={ToggleColors}>
              <div className='active'>
                <span>&nbsp;&nbsp;<FontAwesomeIcon icon={faSun} />&nbsp;&nbsp;</span>
              </div>
              <div>
                <span>&nbsp;&nbsp;<FontAwesomeIcon icon={faMoon} />&nbsp;&nbsp;</span>
              </div>
            </div>
            <div className="profile">
              <div className="info">
                <p>Hey, <b>User1</b></p>
                <small className='text-muted'>Admin</small>
              </div>
              <div className="profile-photo">
                <img src="" alt="profile" />
              </div>
            </div>


            {/*-------------End Of Top------------------- */}
          </div>

          <div style={{ marginTop: "10rem" }}>
            <Clock />
          </div>
          <div className='map-right card-dashboard'>
            <h3>You are here <img src={markerIcon} alt="icon" style={{ height: "20px" }}></img></h3>
            <MapContainer center={location} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {location && <RecenterMap center={location} />}
              <Marker position={location} icon={customIcon}>
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>

          </div>
          <div className='map-right'>
            <Compass/>
          </div>
        </div>
      </div>
    </div>
  )
}
