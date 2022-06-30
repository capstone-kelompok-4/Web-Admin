import React, { useState } from 'react'
import classes from "./Sidebar.module.css";
import AlterraLogo from "../../Assets/Images/alterra_logo.png";
import UserIcon from "../../Assets/Images/icon_user.png";
import { Link } from 'react-router-dom';

const Sidebar = ({activeNow}) => {
  const [active, setActive] = useState(activeNow);

  const sidebarItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: UserIcon,
    },
    {
      path: "/",
      name: "Manage Users",
      icon: UserIcon,
    },
    {
      path: "/manage_courses",
      name: "Manage Courses",
      icon: UserIcon,
    },
    {
      path: "/",
      name: "Upload Files",
      icon: UserIcon,
    },
    {
      path: "/",
      name: "Data Reports",
      icon: UserIcon,
    },
    {
      path: "/",
      name: "Request",
      icon: UserIcon,
    },
  ]
  
  const handleClick = (e) => {
    setActive(e.target.innerText);
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={AlterraLogo} alt="logo"/>
        </div>
        {
          sidebarItems.map((item, idx) => {
            return(
              <Link to={item.path} key={idx} className={classes.navLink} onClick={handleClick} style={{color: active === item.name ? "#FF6C00" : null, borderRight: active === item.name ? "4px solid #FF6C00" : null}}>
                <img src={item.icon} alt="sidebarIcon" />
                <h5>{item.name}</h5>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}

export default Sidebar