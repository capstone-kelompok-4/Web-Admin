import React, { useEffect, useState } from 'react'
import axios from "axios";
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./ManageCourses.module.css";
import AddIcon from "../../Assets/Icons/addIcon.svg";
import { Link } from "react-router-dom";
import Search from '../../Components/Search/Search';
import CourseCard from '../../Components/Course/CourseCard';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const baseURL = "https://62a160e6cc8c0118ef4a5d6c.mockapi.io";
  useEffect(() => {
    axios.get(`${baseURL}/courses`).then(res => setCourses(res.data)).catch(err => console.log(err.message));
  }, [])

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
              <Search placeholder="Search Course" className={classes.searchBar} />
            </div>
          </div>
          <div className={classes.allCourse}>
            <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-5 my-0 ">
              {courses.map((course) => {
                return(
                  <CourseCard
                    key={course.id}
                    course_id={course.id}
                    title={course.title}
                    progress={course.progress}
                    img={course.img}
                    rating={course.rating}
                    total_material={course.total_material}
                    showInfo={true}
                    showProgressBar={false}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageCourses