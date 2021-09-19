import React from "react";
import "../../../App.css";
import logo from "./iiitdm-logo.png";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div data-spy="scroll" data-target="#navbarResponsive">
      <div id="home">
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent fixed-top">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" style={{ color: "white" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner">
              <div className="home-bg"></div>
            </div>
          </div>
        </div>
        <div className="caption text-center" style={{ textAlign: "center" }}>
          <h1>
            Welcome to iiitdm's <br />
            web-based attendance management system
          </h1>
          <Link
            className="btn btn-outline-light btn-lg get_started"
            to="/login"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div id="features" className="offset">
        <div className="white-section">
          <div className="narrow">
            <div className="col-12">
              <h3 className="heading">Features</h3>
              <div className="heading-underline"></div>

              <div className="row text-center">
                <div className="col-md-6">
                  <div className="feature">
                    <i
                      className="fas fa-stream fa-4x"
                      data-fa-transform="shrink-4.15 up-4.5"
                    ></i>
                    <h3>Real-time Monitoring </h3>
                    <p>
                      Provides convenient and real-time monitoring of the
                      student's attendance
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="feature">
                    <i
                      className="fas fa-archive fa-4x"
                      data-fa-transform="shrink-3 up-5"
                    ></i>
                    <h3>Attendance Archive</h3>
                    <p>
                      Provides a record archival policy. The attendance records
                      will be archived after the student has graduated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="offset">
        <footer>
          <div className="row justify-content-center">
            <div className="col-md-5 text-center">
              <img src={logo} alt="logo" /> <br />
              <br />
              <strong>Contact info</strong>
              <br />
              <p>
                Airport Rd, PDPM IIITDM Jabalpur Campus, Khamaria, Jabalpur,
                Madhya Pradesh 482005.
                <br />
                <i className="fas fa-phone "></i> +91-761-2632273 |{" "}
                <i className="fas fa-print"></i> +91-761-2632524.
                <br />
                <i className="fas fa-envelope"></i> not available
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
