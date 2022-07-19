import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import CourseCard from './CourseCard';
import classes from "./CoursesContainer.module.css"; 

function CoursesContainer({title, data, showMoreAble, showInfo, showProgressBar, loading}) {
  const [limit, setLimit] = useState(8);
    const [isReadMoreShown, setIsReadMoreShown] =useState(false);
    const handleReadMoreClick =()=>{
      setIsReadMoreShown (prevState=>!prevState);
      if(isReadMoreShown){
          setLimit(8)
      }else{
          setLimit(null)
      }
    } 

  return (
    <div className={classes.coursesContainer} >
      <div className="d-flex justify-content-between align-items-center">
        <h3 className={classes.title}>{title}</h3>
        {showMoreAble &&
          <button type="button" className={classes.btn} onClick={handleReadMoreClick}>{isReadMoreShown ? "View Less" : "View All"}</button> 
        } 
      </div>
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-5 my-0 ">
        {
          loading && 
          <div className={classes.spinnerContain}>
            <CircularProgress style={{ width: "200px", height: "200px", color: "#FF6C00" }} />
          </div>
        }
        { !loading && data.slice(0, limit? limit : data.length).map((course) => {
          return(
            <CourseCard 
              key={course.id}
              course_id={course.id}
              title={course.name}
              progress={course.progress}
              img={course.banner_url}
              rating={course.rate}
              total_material={course.sections.length}
              showInfo={showInfo}
              showProgressBar={showProgressBar}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CoursesContainer