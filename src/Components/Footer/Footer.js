import React from 'react'
import classes from "./Footer.module.css"

function Footer() {
  return (
    <>
        <div className={`text-center p-4 ${classes.styling}`}>
            © 2022 4vengers. All rights reserved.
        </div>
    </>
  )
}

export default Footer