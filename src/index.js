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
        <Routes basename="/">
        <Route path="/" element={<App/>} />
        <Route path="/userlogin" element={<Userlogin/>} />
        <Route path="/adminlogin" element={<Adminlogin/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/userdashboard" element={<Userdashboard/>}/>
        <Route path="/leafmaps" element={<LeafMaps/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Website />, document.getElementById('root'));