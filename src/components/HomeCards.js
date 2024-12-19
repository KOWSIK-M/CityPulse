import React from "react";
import { Link } from "react-router-dom";

export default function HomeCards() {
  return (
    <div style={{ width: "98vw" }}>
      <div className="row justify-content-center vh-180 animated-background">
        <div className="col-sm-5 my-auto mx-auto cards-appear">
          <div
            className="card custom-card shadow-green p-5 rounded border-info-subtle border-opacity-10 "
            style={{
              margin: "auto",
              marginLeft: "10vw",
              marginBottom: "3vh",
              marginTop: "2vh",
              backgroundColor: "lightgreen",
            }}
          >
            <div className="card-body">
              <img
                src="https://picsum.photos/900/1600?random=4"
                className="card-img-top"
                alt="city"
              ></img>
              <h5 className="card-title fs-1">Explore Roads</h5>
              <p className="card-text fst-italic">
                Road maps are very helpful, right?
              </p>
              <Link to="/" className="btn btn-primary">
                Check
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-5 mx-auto my-auto cards-appear">
          <div
            className="card custom-card card-right shadow-blue p-5 rounded border-info-subtle border-opacity-10 bg-gradient"
            style={{
              margin: "auto",
              marginRight: "10vw",
              marginBottom: "3vh",
              marginTop: "2vh",
              backgroundColor: "lightblue",
              transition: "transform 0.3s ease",
              boxShadow: "0.3s ease",
              cursor: "pointer",
            }}
          >
            <div className="card-body">
              <img
                src="https://picsum.photos/1600/900?random=1"
                className="card-img-top"
                alt="city"
              ></img>
              <h5 className="card-title fs-1">Forestation</h5>
              <p className="card-text fst-italic">
                Is your city green? Lets find out
              </p>
              <Link to="/" className="btn btn-primary">
                Check
              </Link>
            </div>
          </div>
        </div>

        <div className="col-sm-5 my-auto mx-auto cards-appear">
          <div
            className="card custom-card shadow-bisque p-5 rounded border-info-subtle border-opacity-10 bg-gradient"
            style={{
              margin: "auto",
              marginLeft: "10vw",
              marginBottom: "2vh",
              backgroundColor: "bisque",
            }}
          >
            <div className="card-body">
              <img
                src="https://picsum.photos/900/1600?random=2"
                className="card-img-top"
                alt="city"
              ></img>
              <h5 className="card-title fs-1">Hotels</h5>
              <p className="card-text fst-italic">
                New to city? Need some place to stay?
              </p>
              <Link to="/" className="btn btn-primary">
                Check
              </Link>
            </div>
          </div>
        </div>

        <div className="col-sm-5 mx-auto my-auto cards-appear">
          <div
            className="card custom-card card-right shadow-pink p-5 rounded border-info-subtle border-opacity-10 bg-gradient"
            style={{
              margin: "auto",
              marginRight: "10vw",
              marginBottom: "2vh",
              backgroundColor: "lightpink",
            }}
          >
            <div className="card-body">
              <img
                src="https://picsum.photos/1600/900?random=3"
                className="card-img-top"
                alt="city"
              ></img>
              <h5 className="card-title fs-1">Public Amenities</h5>
              <p className="card-text fst-italic">
                Know what's happening around you in your city with latest news.
              </p>
              <Link to="/" className="btn btn-primary">
                Check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
