import React from 'react';
import './SignUp.css';
import GoogleSignIn from './GoogleSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCity, faCalendar } from '@fortawesome/free-solid-svg-icons';
import signupImg from '../images/signup-image.jpg';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
  return (
    <div style={{ height: "100vh" }}>
      <div className="main">
        <section className="signup">
          <div className="container-sup">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="name"><FontAwesomeIcon icon={faUser} className="icon" /></label>
                    <input type="text" name="name" id="name" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className="icon" /></label>
                    <input type="email" name="email" id="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob"><FontAwesomeIcon icon={faCalendar} className="icon" /></label>
                    <input type="date" name="dob" id="dob" placeholder="Date of birth" />
                  </div>
                  
                  
                  <div className="form-group">
                    <div>
                    <p>Gender</p>
                    
                    </div>
                    <div className="gender-options">
                      <label htmlFor="gender-male" className='label-gender'></label>
                        <input type="radio" name="gender" id="gender-male" value="male" /> Male
                      
                      <label htmlFor="gender-female" className='label-gender'></label>
                        <input type="radio" name="gender" id="gender-female" value="female" /> Female
                      
                      <label htmlFor="gender-other" className='label-gender'></label>
                        <input type="radio" name="gender" id="gender-other" value="other" /> Other
                      
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city"><FontAwesomeIcon icon={faCity} className="icon" /></label>
                    <input type="text" name="city" id="city" placeholder=" City" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass"><FontAwesomeIcon icon={faLock} className="icon" /></label>
                    <input type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass"><FontAwesomeIcon icon={faLock} className="icon" /> </label>
                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="agree-term" className="label-agree-term">
                      <span>
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" /></span>I agree to all statements in 
                      <a href="/CityPulse/terms&conditions" className="term-service"> Terms of service</a>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src={signupImg} alt="sign up" /></figure>
                <GoogleSignIn/>
                <Link to="/CityPulse/userlogin" className="signup-image-link">I am already a member</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
