import React from 'react'
import { Link } from 'react-router-dom';
import classes from "./Navbar.module.css";
import NavbarLogo from "../../Assets/Icons/alterra_logo.svg";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm" style={{position: "sticky", top: "0", zIndex: "100", backgroundColor: "#FFF", padding: "0"}}>
        <div className="container-fluid px-5" style={{padding: "10px 0 20px"}}>
          <div className={classes.left}>
            <Link to="/">
              <img src={NavbarLogo} alt="navbarLogo" width="164px" height="40px"/>
            </Link>
          </div>
          {/* {isLogin && (
            <div className={classes.right}>
              <img src="https://random.imagecdn.app/800/150" alt="notificationIcon" width="32px" height="32px"/>
              <img src="https://random.imagecdn.app/800/150" alt="notificationIcon" width="32px" height="32px"/>
              <button className="btn btn-outline-secondary text-dark border-dark bg-light fw-bold" type="submit">Arya</button>
            </div>
          )} */}
        </div>
      </nav>
    </>
  )
}

export default Navbar