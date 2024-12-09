import React from "react";
import "./contact.css";
import logo from "../src/images/logo.png";
import { Link } from "react-router-dom";

const AnchorStyle = { textDecoration: "none" };
function About() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <nav className="navbar1">
        <div className="container">
          <h1 className="logo lg-heading text-light">
            <img src={logo} alt="CityPulse" height={36} width={36}></img>
            <i className="fas fa-vihara"> CityPulse </i>
          </h1>
          <ul className="nav-items" style={{ marginLeft: "55vw" }}>
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Contact us</Link>
            </li>
            <li className="nav-item">
              <div class="menu">
                <div class="item">
                  <button
                    class="link"
                    style={AnchorStyle}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span> Login </span>
                    <svg viewBox="0 0 360 360">
                      <g id="SVGRepo_iconCarrier">
                        <path
                          id="XMLID_225_"
                          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <div class="submenu">
                    <div class="submenu-item">
                      <Link
                        to="/userlogin"
                        className="submenu-link"
                        style={AnchorStyle}
                      >
                        User
                      </Link>
                    </div>
                    <div class="submenu-item">
                      <Link
                        to="/adminlogin"
                        className="submenu-link"
                        style={AnchorStyle}
                      >
                        Admin
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="cont">
        <br></br>
        <br></br>
        <br></br>
        <h3 style={{ color: "ivory" }}>
          The City Management System aims to make it easy for people to find
          information about their city. This app will help residents quickly
          report problems, like broken lights or potholes, and find services,
          like parks and hospitals. It will have a simple design so everyone can
          use it easily. The system will include "Quick Problem Reporting, Easy
          Access to Information, and Updates about the City." This way, people
          can enjoy living in their city and get help when they need it.
        </h3>
      </div>
    </div>
  );
}

export default About;
