import React from 'react'

export default function Navbar() {
  return (
    <>
        <nav className=" bg-dark justify-content-center" data-bs-theme="dark" style={{height:"6vh",background: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",borderTop:"0.5px solid aqua"}}>

        <ul className="nav justify-content-center">
  <li className="nav-item" >
    <a className="nav-link active" aria-current="page" href="/">©Citizo</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">About</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">T&C apply</a>
  </li>

</ul>
</nav>

    </>
  )
}
