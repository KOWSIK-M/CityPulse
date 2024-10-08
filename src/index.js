import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './Userlogin';
import App from './App'
import Adminlogin from './Adminlogin';
import Contact from './contact';
import About from './about';
import Dashboard from './dashboard';
import Userdashboard from './userdashboard';
import LeafMaps from './LeafMaps';
function Website() {
  return (
    <BrowserRouter>
    <div>
        <Routes basename="/Citizo">
        <Route path="/Citizo" element={<App/>} />
        <Route path="Citizo/userlogin" element={<Userlogin/>} />
        <Route path="Citizo/adminlogin" element={<Adminlogin/>} />
        <Route path="Citizo/contact" element={<Contact/>}/>
        <Route path="Citizo/about" element={<About/>}/>
        <Route path="Citizo/dashboard" element={<Dashboard/>}/>
        <Route path="Citizo/userdashboard" element={<Userdashboard/>}/>
        <Route path="Citizo/leafmaps" element={<LeafMaps/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Website />, document.getElementById('root'));