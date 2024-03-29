import React from 'react'
import classes from "./CourseCard.module.css";
import MaterialIcon from "../../Assets/Icons/material.svg";
import StarIcon from "../../Assets/Icons/star.svg";
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

function CourseCard({course_id, title, img, progress, rating, total_material, showProgressBar, showInfo}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/manage_courses/edit_course/${course_id}`)
  }
  return (
    <div className={`col p-0 ${classes.parent}`}>
      <div className={`card h-100 m-auto ${classes.singleCard}`}>
        {
          img === "" || img === null ? (
            <img src="https://firebasestorage.googleapis.com/v0/b/capstone-project-alterra.appspot.com/o/course-banner%2FWoman%20debugging%20a%20program.png?alt=media&token=4d64524b-894e-4dc1-9632-49db764a7622" className="card-img-top" alt="courseCardImg" width="250px" height="150px" style={{padding: "15px 15px 0 15px", borderRadius: "20px 20px 0 0"}}/>
            ) : (
            <img src={img} className="card-img-top" alt="courseCardImg" width="250px" height="150px" style={{padding: "15px 15px 0 15px", borderRadius: "20px 20px 0 0"}}/>
          )
        }
        <div className="card-body text-start h-100">
          <h5 className={classes.cardTitle} onClick={handleClick}>{title}</h5> 
        </div>
        {showProgressBar &&
          <div className="card-body ">
            {/* <ProgressBar animated bgcolor="#0275d8" now={progress} />  */}
            <ProgressBar bgcolor="#133461" progress={progress}  height={10} />
            <p className={classes.completed}>Complete:  <span className='fw-bold'>{progress}%</span></p>
          </div>
        }
        {showInfo && 
        <div className="card-body" style={{fontFamily: "Poppins"}}>
          <div className='d-flex justify-content-between mb-3'>
            <div className='d-flex' style={{columnGap: "5px"}}>
              <img src={MaterialIcon} alt="material-icon" width="20px" height="20px"/>
              <p className={classes.info}>{total_material} Materi</p>
            </div>
            <div className='d-flex'style={{columnGap: "5px"}}>
              <img src={StarIcon} alt="star-icon" width="20px" height="20px" />
              <p className={classes.info}>{rating}</p>
            </div>
          </div>
          <div className={classes.readMore}>
            <Link to={`/manage_courses/edit_course/${course_id}`}>
              <button className={classes.btn}>
                Edit Course
              </button>
            </Link>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
  
export default CourseCard