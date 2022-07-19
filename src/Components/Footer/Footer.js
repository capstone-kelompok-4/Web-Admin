import React from 'react'
import classes from "./Footer.module.css";
import CopyrightIcon from "../../Assets/Icons/copyright_icon.png";

function Footer() {
  return (
    <>
        <div className={`text-center p-4 ${classes.styling}`}>
            <img src={CopyrightIcon} alt="copyrightIcon" width={24} height={24} /> 2022 4vengers. All rights reserved.
        </div>
    </>
  )
}

export default Footer