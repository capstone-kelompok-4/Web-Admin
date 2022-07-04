import React from 'react'
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar';
import Search from '../../Components/Search/Search';
import classes from "./ManageUsers.module.css";
import AddIcon from "../../Assets/Icons/addIcon.svg";
import Footer from "../../Components/Footer/Footer"

function ManageUsers() {
  return (
    <>
      <Sidebar activeNow="Manage Users"/>
      <div className={classes.container}>
        <Header data="Manage Users" />
        <div className={classes.containerContent}>
          <div className={classes.infoWrapper}>
            <div className={classes.title}>
              <h2>All Users</h2>
            </div>
            <div className={`px-4 py-5 rounded-3 ${classes.stylingcontent}`}>
              <div className={classes.stylingaction}>
                <div className={`${classes.actionleft}`}>
                  <h4>Users List</h4>
                  <div className='d-grid gap-4'>
                    <h5>Show entries</h5>
                    <h5>Filter Specialization</h5>
                  </div>
                </div>
                <div className={classes.actionright}>
                  <Link to="/manage_users/add_user">
                    <Button className={classes.addBtn} name="Add User" icon={AddIcon}/>
                  </Link>
                  <Search placeholder="Search User" className={classes.searchBar} />
                </div>
              </div>
            </div>
            
          </div>
          {/* <div className={classes.allCourse}>
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
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ManageUsers