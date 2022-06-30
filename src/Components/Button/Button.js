import React from 'react'
import classes from "./Button.module.css";

function Button({className, name, icon, onClick}) {
  return (
    <div className={classes.flex}>
      <button className={className} onClick={onClick}>
        {icon && <img src={icon} alt={icon} width="35px"/>}
        <span>{name}</span>
      </button>
    </div>
  )
}

export default Button