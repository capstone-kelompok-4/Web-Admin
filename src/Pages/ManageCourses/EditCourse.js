import React from 'react'
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar';
import classes from "./EditCourse.module.css";

const EditCourse = () => {
  return (
    <>
      <Sidebar activeNow="Manage Courses"/>
      <div className={classes.container}>
        <Header data="Manage Courses"/>
      </div>
    </>
  )
}

export default EditCourse