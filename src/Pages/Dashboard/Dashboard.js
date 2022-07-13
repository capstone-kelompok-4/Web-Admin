import React, { useEffect, useState } from 'react'
import CoursesContainer from '../../Components/Course/CoursesContainer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./Dashboard.module.css";
import Footer from '../../Components/Footer/Footer';
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import axios from 'axios';
import Chart from "./Chart.js";

function Dashboard() {
  const [courseData, setCourseData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const token = getToken();
    var configGetAllCourses = {
      method: 'get',
      url: `${BASE_URL}/courses`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllCourses).then(res => {
      setLoading(false);
      setCourseData(res.data.data);
    }).catch(err => console.log(err));

    var configGetAllUsers= {
      method: 'get',
      url: `${BASE_URL}/users/all`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllUsers).then(res => setUsersData(res.data.data)).catch(err => console.log(err));

    var configGetAllRequests= {
      method: 'get',
      url: `${BASE_URL}/course-takens`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllRequests).then(res => setRequestsData(res.data.data)).catch(err => console.log(err));
  }, [])

  // GET ONLY ROLE USER
  const roleUserData = usersData.filter(user => user.roles[0].name === "ROLE_USER");

  return (
    <>
      <Sidebar activeNow="Dashboard"/>
      <div className={classes.container}>
       <Header data="Dashboard" />
       <div className={classes.containerContent}>
        <div className={classes.infoWrapper}>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Users</p>
            <p className={classes.info}>{roleUserData.length}</p>
          </div>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Courses</p>
            <p className={classes.info}>{courseData.length}</p>
          </div>
          <div className={classes.wrapper}>
            <p className={classes.title}>Total Requests</p>
            <p className={classes.info}>{requestsData.length}</p>
          </div>
        </div>
        <div className={classes.statisticWrapper}>
          <div className={classes.left}>
            <div className={classes.statistics}>
              <p className={classes.title}>Access Statistics</p>
              <Chart />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.recentActivity}>
              <p className={classes.title}>Recent Activity</p>  
            </div>
          </div>
        </div>
        <CoursesContainer title="Manage Courses" data={courseData} showInfo={true} showProgressBar={false} showMoreAble={true} loading={loading}/>
       </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard