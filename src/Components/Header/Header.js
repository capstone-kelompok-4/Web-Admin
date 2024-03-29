import React from 'react'
import { getUser } from '../../Configs/APIAuth';
import classes from "./Header.module.css";

const Header = ({data}) => {
  const user = getUser();
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <h4>{data}</h4>
      </div>
      <div className={classes.right}>
        <div className={classes.userInfo}>
          <p className={classes.name}>{user?.name}</p>
          <p className={classes.role}>Admin</p>
        </div>
        <div className={classes.profilePicture}>
          <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/238.jpg" alt="profilePicture"/>
        </div>
      </div>
    </div>
  )
}

export default Header