import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlogin from "./Userlogin";
import App from "./App";
import Adminlogin from "./Adminlogin";
import Contact from "./contact";
import About from "./about";
import Map2 from "./map2";
import LeafMaps from "./LeafMaps";
import TermsAndConditions from "./TermsAndConditions";
import PricingPayment from "./PricingPayment";
import Payment from "./components/Payment";
import UserDashboard from "./UserDashboard";
import WeatherDetails from "./components/WeatherDetails";
import ForgotPassword from "./ForgotPassword";
import PasswordUpdate from "./PasswordUpdate";
import AdminDashboard from "./AdminDashboard";
import Topics from "./components/Topics";
import ForumForm from "./components/ForumForm";
import ForumDisplay from "./components/ForumDisplay";
function Website() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/map2" element={<Map2 />} />
          <Route path="/leafmaps" element={<LeafMaps />} />
          <Route path="/terms&conditions" element={<TermsAndConditions />} />
          <Route path="/PricingPayment" element={<PricingPayment />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/PasswordUpdate" element={<PasswordUpdate />} />
          <Route path="/weather" element={<WeatherDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById("root"));
