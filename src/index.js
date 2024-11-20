import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './Userlogin';
import App from './App'
import Adminlogin from './Adminlogin';
import Contact from './contact';
import About from './about';
import Map1 from './map1';
import Map2 from './map2';
import LeafMaps from './LeafMaps';
import SignUp from './components/SignUp';
import TermsAndConditions from './TermsAndConditions';
import PricingPayment from './PricingPayment';
import Payment from './components/Payment';
import UserDashboard from './UserDashboard';
import CityMap1 from './example';
import NavigationMap from './Navigate';
import Dashboard from './components/Dashboard';
import WeatherDetails from './components/WeatherDetails';
import CityNews from './components/CityNews';
function Website() {
  return (
    <BrowserRouter>
    <div>
        <Routes basename="/CityPulse">
        <Route path="/CityPulse" element={<App/>} />
        <Route path="CityPulse/userlogin" element={<Userlogin/>} />
        <Route path="CityPulse/adminlogin" element={<Adminlogin/>} />
        <Route path="CityPulse/contact" element={<Contact/>}/>
        <Route path="CityPulse/about" element={<About/>}/>
        <Route path="CityPulse/map1" element={<Map1/>}/>
        <Route path="CityPulse/map2" element={<Map2/>}/>
        <Route path="CityPulse/leafmaps" element={<LeafMaps/>}/>
        <Route path="CityPulse/signup" element={<SignUp/>}></Route>
        <Route path="CityPulse/terms&conditions" element={<TermsAndConditions/>}/>
        <Route path="CityPulse/PricingPayment" element={<PricingPayment/>}/>
        <Route path="CityPulse/Payment" element={<Payment/>}/>
        <Route path="CityPulse/UserDashboard" element={<UserDashboard/>}/>
        
        <Route path="CityPulse/example" element={<CityMap1/>}/>
        <Route path="CityPulse/navigate" element={<NavigationMap/>}/>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<WeatherDetails />} />
        <Route path="/CityPulse/News" element={<CityNews/>} />
        </Routes>
    </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Website />, document.getElementById('root'));