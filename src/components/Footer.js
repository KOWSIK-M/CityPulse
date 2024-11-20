import React from 'react'
import { Link } from 'react-router-dom'
const AnchorStyle={textDecoration:'none'}

export default function Navbar() {
  return (
    <>
        <nav className=" bg-dark justify-content-center" data-bs-theme="dark" style={{height:"6vh",background: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",borderTop:"0.5px solid aqua"}}>

        <ul className="nav justify-content-center">
  <li className="nav-item" >
    <Link className="nav-link active" aria-current="page" to="/CityPulse" style={AnchorStyle}>©CityPulse</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/CityPulse/about" style={AnchorStyle}>About</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/CityPulse/terms&conditions" style={AnchorStyle}>T&C apply</Link>
  </li>

</ul>
</nav>

    </>
  )
}
