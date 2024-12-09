import React from "react";
import "./contact.css";
import wa from "./images/whatsapp.png";
import logo from "../src/images/logo.png";
import { Link } from "react-router-dom";

const AnchorStyle = { textDecoration: "none" };
function Contact() {
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
                  <Link to="#" class="link" style={AnchorStyle}>
                    <span> Login </span>
                    <svg viewBox="0 0 360 360">
                      <g id="SVGRepo_iconCarrier">
                        <path
                          id="XMLID_225_"
                          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                        ></path>
                      </g>
                    </svg>
                  </Link>
                  <div class="submenu">
                    <div class="submenu-item">
                      <Link
                        to="/userlogin"
                        class="submenu-link"
                        style={AnchorStyle}
                      >
                        {" "}
                        User{" "}
                      </Link>
                    </div>
                    <div class="submenu-item">
                      <Link
                        to="/adminlogin"
                        class="submenu-link"
                        style={AnchorStyle}
                      >
                        {" "}
                        Admin{" "}
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
        <h3 style={{ color: "ivory", marginLeft: "6vw" }}>
          For any Queries, you can feel free to contact us 😊
        </h3>

        <div class="contact-link1">
          <Link
            class="me"
            to="whatsapp://send?phone=7981793537"
            style={AnchorStyle}
          >
            Contact Us via WhatsApp{" "}
          </Link>
          &nbsp;
          <img src={wa} alt="" style={{ height: "35px", width: "35px" }}></img>
        </div>
        <div class="contact-link2">
          <i class="fa2"></i>
          <Link
            class="m"
            to="mailto:2200030358@kluniversity.in?subject=Your%20Subject&body=Your%20Message%20Here"
            style={AnchorStyle}
          >
            Contact us via Email✉️
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
