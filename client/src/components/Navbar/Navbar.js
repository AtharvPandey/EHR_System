import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid ">
          <Link to="#" className="navbar-brand text-success">
            <h2>MediGuard</h2>
          </Link>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-3 mb-lg-1 gap-4">
              <li className="nav-item">
                <Link to="/" className="nav-link " aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link " aria-current="page">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link " aria-current="page">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link " aria-current="page">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link " aria-current="page">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
