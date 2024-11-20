import {React,useEffect} from 'react'
import { Link } from 'react-router-dom';


export default function Cookie() {
    useEffect(() => {
        const cookieBox = document.querySelector(".cookie-wrapper"),
          buttons = document.querySelectorAll(".cookie-button");
    
        const executeCodes = () => {
          //if cookie exists, don't show consent box
          if (document.cookie.includes("cookieBy=citypulse")) return;
          cookieBox.classList.add("show");
    
          buttons.forEach((button) => {
            button.addEventListener("click", () => {
              cookieBox.classList.remove("show");
    
              if (button.id === "acceptBtn") {
                document.cookie = "cookieBy=citypulse; max-age=" + 60 * 60 * 24 * 30; // 1 month
              }
            });
          });
        };
    
        // Call the function on page load
        window.addEventListener("load", executeCodes);
      }, []);
  return (
    <div>
      <div className="cookie-wrapper">
          <header className='cookie-header'>
            <i className="bx bx-cookie"></i>
            <h2>Cookies Consent</h2>
          </header>
          <div className="cookie-data">
            <p>
              This website uses cookies to ensure you get the best experience. <Link to="/CityPulse/terms&conditions" >Read more...</Link>
            </p>
          </div>
          <div className="cookie-buttons">
            <button className="cookie-button" id="acceptBtn">Accept</button>
            <button className="cookie-button" id="declineBtn">Decline</button>
          </div>
        </div>
    </div>
  )
}
