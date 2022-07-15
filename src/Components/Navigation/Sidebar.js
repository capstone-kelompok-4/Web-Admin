import React, { useState } from 'react'
import classes from "./Sidebar.module.css";
import AlterraLogo from "../../Assets/Images/alterra_logo.png";
import UserIcon from "../../Assets/Icons/user-icon.svg";
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from "../../Assets/Icons/dashboard.svg"
import SectionIcon from "../../Assets/Icons/section-coourse.svg"
import UploadFileIcon from "../../Assets/Icons/upload-files.svg"
import DataReportIcon from "../../Assets/Icons/data-reports.svg"
import CourseIcon from "../../Assets/Icons/manage-courses.svg"
import LogoutIcon from "../../Assets/Icons/logout.svg"
import { removeAdminSession } from '../../Configs/APIAuth';
import Swal from 'sweetalert2';

const Sidebar = ({activeNow}) => {
  const [active, setActive] = useState(activeNow);

  const sidebarItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: DashboardIcon,
    },
    {
      path: "/manage_users",
      name: "Manage Users",
      icon: UserIcon,
    },
    {
      path: "/manage_courses",
      name: "Manage Courses",
      icon: CourseIcon,
    },
    {
      path: "/section_courses",
      name: "Section Course",
      icon: SectionIcon,
    },
    {
      path: "/upload_files",
      name: "Upload Files",
      icon: UploadFileIcon,
    },
    {
      path: "/data_reports",
      name: "Data Reports",
      icon: DataReportIcon,
    },
    {
      path: "/request",
      name: "Request",
      icon: DataReportIcon,
    },
  ]
  
  const handleClick = (e) => {    
    setActive(e.target.innerText);
  }

  const navigate = useNavigate();
  const logoutHandler = async () => {
    await removeAdminSession();
    await Swal.fire(
      'Logout!',
      'Succesfully Logout.',
      'success'
    )
    await navigate("/login");
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={AlterraLogo} alt="logo"/>
          </Link>
        </div>
        {
          sidebarItems.map((item, idx) => {
            return(
              <Link to={item.path} key={idx} className={classes.navLink} onClick={handleClick} style={{color: active === item.name ? "#FF6C00" : null, borderRight: active === item.name ? "4px solid #FF6C00" : null}}>
                <img src={item.icon} alt="sidebarIcon" width="18px"/>
                <h5>{item.name}</h5>
              </Link>
            )
          })
        }
        <button className={classes.navLink} onClick={logoutHandler} >
          <img src={LogoutIcon} alt="iconButton" width="18px"/> 
          <h5>Logout</h5>
        </button>
      </div>
    </>
  )
}

export default Sidebar