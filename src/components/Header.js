import React, { useRef, useEffect } from 'react';
import logo from '../images/logo.png';

const AnchorStyle={textDecoration:'none'}

export default function Header() {
  const toastTriggerRef = useRef(null);
  const toastLiveExampleRef = useRef(null);

  useEffect(() => {
    const toastTrigger = toastTriggerRef.current;
    const toastLiveExample = toastLiveExampleRef.current;

    if (toastTrigger) {
      const toastBootstrap = window.bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }

    return () => {
      if (toastTrigger) {
        toastTrigger.removeEventListener('click', () => {
          const toastBootstrap = window.bootstrap.Toast.getOrCreateInstance(toastLiveExample);
          toastBootstrap.show();
        });
      }
    };
  }, []);



  return (
    <div>
      <header className="header">
        <nav className="navbar1">
          <div className="container">
            <h1 className="logo lg-heading text-light">
              <img src={logo} alt="CityPulse" height={36} width={36}></img>
              <i className="fas fa-vihara"> CityPulse </i>
            </h1>
            <ul className="nav-items" style={{ marginLeft: "56vw" }}>
              <li className="nav-item"><a href="/CityPulse" style={AnchorStyle}>Home</a></li>
              <li className="nav-item"><a href="/CityPulse/about" style={AnchorStyle}>About</a></li>
              <li className="nav-item"><a href="/CityPulse/contact"style={AnchorStyle}>Contact us</a></li>
              <li className="nav-item">
                <div class="menu">
                  <div class="item">
                    <a href="/CityPulse" class="link" style={AnchorStyle}>
                      <span> Login </span>
                      <svg viewBox="0 0 360 360">
                        <g id="SVGRepo_iconCarrier">
                          <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <div class="submenu">
                      <div class="submenu-item">
                        <a href="/CityPulse/userlogin" class="submenu-link" style={AnchorStyle}> User </a>
                      </div>
                      <div class="submenu-item">
                        <a href="/CityPulse/adminlogin" class="submenu-link" style={AnchorStyle}> Admin </a>
                      </div>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </nav>


        <div className="container">
          <div className="header-content">
            <h1 className="md-heading text-light">Welcome to CityPulse</h1>
            <p className="text-light">A place where you can know your City Better!</p>
            <button type="button" className="btnEx btnEx-primary text-red md-heading" ref={toastTriggerRef}>
              Explore
            </button>

            <div
              ref={toastLiveExampleRef}
              className="toast position-fixed p-3"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ zIndex: 1000, left: "140%", top: "210%" }}
            >
              <div className="toast-header" >
                <strong className="me-auto" style={{ fontSize: 10 }}>Hello, Friend! Please Login first.</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}
