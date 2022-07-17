import React, { useEffect, useState } from 'react'
import CoursesContainer from '../../Components/Course/CoursesContainer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./Dashboard.module.css";
import Footer from '../../Components/Footer/Footer';
import { BASE_URL, getToken, removeAdminSession } from '../../Configs/APIAuth';
import axios from 'axios';
import Chart from "./Chart.js";
import { BASE_URL3 } from '../../Configs/MockAPI';
import Activity from './Activity';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState([]);
  
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
    }).catch(err => {
      setLoading(false);
      if(err.response.status === 403) {
        Swal.fire(
          'Oops!',
          'Sesi anda telah berakhir, silahkan login kembali',
          'warning'
        ).then(() => {
          removeAdminSession();
          navigate("/login")
        })
      }
    });

    var configGetAllUsers= {
      method: 'get',
      url: `${BASE_URL}/users/all`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllUsers).then(res => {
      setLoading(false)
      setUsersData(res.data.data)
    }).catch(err => {
      setLoading(false);
      console.log(err)
    });

    var configGetAllRequests= {
      method: 'get',
      url: `${BASE_URL}/course-takens`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllRequests).then(res => setRequestsData(res.data.data)).catch(err => console.log(err));

    axios.get(`${BASE_URL3}/Recent_Activity`).then(res => setActivityData(res.data)).catch(err => console.log(err.message));
  }, [navigate])

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
              <p className={classes.titleinfo}>Access Statistics</p>
              <Chart />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.recentActivity}>
              <div className='d-flex justify-content-between'>
                <p className={classes.titleinfo}>Recent Activity</p> 
                {/* <p className={classes.titleinfoall}>View All</p> */}
                <button type="button" className={classes.btninfoall}>View All</button> 
              </div>
              
              <Activity data={activityData} loading={loading}/>
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