import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./ManageCourses.module.css";
import AddIcon from "../../Assets/Icons/addIcon.svg";
import { Link } from "react-router-dom";
import Search from '../../Components/Search/Search';
import CourseCard from '../../Components/Course/CourseCard';
import Footer from '../../Components/Footer/Footer';
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  console.log(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      setLoading(false)
      setCourses(res.data.data);
    })
    .catch(err => console.log(err));
  }, [])

  const searchCoursesHandler = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Sidebar activeNow="Manage Courses"/>
      <div className={classes.container}>
        <Header data="Manage Courses" />
        <div className={classes.containerContent}>
          <div className={classes.infoWrapper}>
            <div className={classes.title}>
              <h2>All Course</h2>
            </div>
            <div className={classes.action}>
              <Link to="/manage_courses/add_course">
                <Button className={classes.addBtn} name="Add Course" icon={AddIcon}/>
              </Link>
              <Search placeholder="Search Course" className={classes.searchBar} onChange={searchCoursesHandler} />
            </div>
          </div>
          <div className={classes.allCourse}>
            <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-5 my-0 ">
              {loading && (
                <div className={classes.spinnerContain}>
                  <CircularProgress style={{ width: "200px", height: "200px", color: "#FF6C00" }} />
                </div>
              )}
              { !loading && courses.filter((course) => {
                if(searchTerm === ""){
                  return course
                } else if (course.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return course
                } return false
              }).map((course) => {
                return(
                  <CourseCard
                    key={course.id}
                    course_id={course.id}
                    title={course.name}
                    progress={course.progress}
                    img={course.banner_url}
                    rating={course.rate}
                    total_material={course.sections.length}
                    showInfo={true}
                    showProgressBar={false}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ManageCourses