import React from 'react'

export default function HomeCards() {
  return (
    <div style={{width: "98vw"}}>
      <div className="row justify-content-center vh-180 animated-background">
        <div className="col-sm-5 my-auto mx-auto cards-appear">
          <div className="card custom-card shadow-green p-5 rounded border-info-subtle border-opacity-10 " style={{ height: "70vh", width: "30vw", margin: "auto", marginLeft: "10vw", marginBottom: "3vh",marginTop:"2vh",backgroundColor: "lightgreen" }}>
            <div className="card-body">
              <img src="https://loremflickr.com/1600/900/road,bridge" className="card-img-top" alt="city" style={{ height: "36vh", width: "24vw" }}></img>
              <h5 className="card-title fs-1">Special title treatment</h5>
              <p className="card-text fst-italic">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-5 mx-auto my-auto cards-appear">
          <div className="card custom-card shadow-blue p-5 rounded border-info-subtle border-opacity-10 bg-gradient" style={{ height: "70vh", width: "30vw", margin: "auto", marginRight: "10vw", marginBottom: "3vh",marginTop:"2vh",backgroundColor: "lightblue",transition: "transform 0.3s ease",boxShadow: "0.3s ease",cursor: "pointer" }}>
            <div className="card-body">
              <img src="https://loremflickr.com/900/1600/forest,river" className="card-img-top" alt="city" style={{ height: "36vh", width: "24vw" }}></img>
              <h5 className="card-title fs-1">Special title treatment</h5>
              <p className="card-text fst-italic">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-sm-5 my-auto mx-auto cards-appear">
          <div className="card custom-card shadow-bisque p-5 rounded border-info-subtle border-opacity-10 bg-gradient" style={{ height: "70vh", width: "30vw", margin: "auto", marginLeft: "10vw", marginBottom: "2vh",backgroundColor: "bisque" }}>
            <div className="card-body">
              <img src="https://loremflickr.com/1600/900/hotel,building,lodge" className="card-img-top" alt="city" style={{ height: "36vh", width: "24vw" }}></img>
              <h5 className="card-title fs-1">Special title treatment</h5>
              <p className="card-text fst-italic">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-sm-5 mx-auto my-auto cards-appear">
          <div className="card custom-card shadow-pink p-5 rounded border-info-subtle border-opacity-10 bg-gradient" style={{ height: "70vh", width: "30vw", margin: "auto", marginRight: "10vw", marginBottom: "2vh",backgroundColor: "lightpink" }}>
            <div className="card-body">
              <img src="https://loremflickr.com/900/1600/park,trees,place" className="card-img-top" alt="city" style={{ height: "36vh", width: "24vw" }}></img>
              <h5 className="card-title fs-1">Special title treatment</h5>
              <p className="card-text fst-italic">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
