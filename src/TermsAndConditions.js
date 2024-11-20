import React from 'react';
import { Link } from 'react-router-dom';
import './TermsAndConditions.css'; // Import the custom CSS file

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Last updated: October 2024</p>

      <h2 className="h3tc">Welcome to CityPulse</h2>
      <p>
        By using our platform to access, manage, or provide feedback on city-related information, you agree to these terms and conditions.
        Please read them carefully.
      </p>

      <h3 className="h3tc">1. Use of Services</h3>
      <p>
        Our platform allows users to navigate city details, report public service issues, and provide feedback. Admins can update city information, monitor services, and handle infrastructure data.
      </p>

      <h3 className="h3tc">2. User Responsibilities</h3>
      <p>
        As a user, you are responsible for ensuring the accuracy of the data you provide, including feedback or reports. You must not misuse the platform to post misleading or harmful content.
      </p>

      <h3 className="h3tc">3. Admin Responsibilities</h3>
      <p>
        Admins are entrusted with managing city data. Any updates made should reflect the actual conditions, and all data handling must comply with local laws and regulations.
      </p>

      <h3 className="h3tc">4. Privacy and Data Security</h3>
      <p>
        We prioritize the privacy of users. Any personal data collected will be handled according to our Privacy Policy. Please ensure that your account details remain secure.
      </p>

      <h3 className="h3tc">5. Changes to the Terms</h3>
      <p>
        We reserve the right to modify these terms at any time. Your continued use of the platform signifies your acceptance of any updated terms.
      </p>

      <h3 className="h3tc">6. Termination</h3>
      <p>
        We may suspend or terminate your account if you violate these terms or engage in activities that harm the platform or other users.
      </p>

      <h3 className="h3tc">7. Contact Us</h3>
      <p>
        If you have any questions or concerns about these terms, feel free to <Link to="/CityPulse/contact">contact us</Link>.
      </p>

      <p>Thank you for using CityPulse to help manage and improve your city!</p>
    </div>
  );
};

export default TermsAndConditions;
