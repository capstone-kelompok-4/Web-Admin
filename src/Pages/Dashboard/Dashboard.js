import React, { useEffect, useState } from 'react'
import CoursesContainer from '../../Components/Course/CoursesContainer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./Dashboard.module.css";
// import { getAllCourses } from '../../Configs/MockAPI';
import Footer from '../../Components/Footer/Footer';
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import axios from 'axios';

function Dashboard() {
  const [courseData, setCourseData] = useState([]);
  
  useEffect(() => {
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/courses`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(res => {
      setCourseData(res.data.data);
    })
    .catch(err => console.log(err));


    // getAllCourses().then(res => setCourseData(res.data)).catch(err => console.error(err.message));
  }, [])

  return (
    <>
      <Sidebar activeNow="Dashboard"/>
      <div className={classes.container}>
       <Header data="Dashboard" />
       <div className={classes.containerContent}>
        <div className={classes.infoWrapper}>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Users</p>
            <p className={classes.info}>84</p>
          </div>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Courses</p>
            <p className={classes.info}>12</p>
          </div>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Requests</p>
            <p className={classes.info}>6</p>
          </div>
        </div>
        <div className={classes.statisticWrapper}>
          <div className={classes.left}>
            <div className={classes.statistics}>
              <p className={classes.title}>Access Statistics</p>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.recentActivity}>
              <p className={classes.title}>Recent Activity</p>  
            </div>
          </div>
        </div>
        <CoursesContainer title="Manage Courses" data={courseData} showInfo={true} showProgressBar={false} showMoreAble={true}/>
       </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard