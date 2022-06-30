import React from 'react'
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./Dashboard.module.css";

function Dashboard() {
  return (
    <>
      <Sidebar/>
      <div className={classes.container}>
       <Header data="Dashboard" />
       <div className={classes.containerContent}>
        <h1>Halo</h1>
       </div>
      </div>
    </>
  )
}

export default Dashboard