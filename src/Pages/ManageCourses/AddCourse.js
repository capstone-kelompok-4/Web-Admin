import React, { useState } from 'react'
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./AddCourse.module.css";

const AddCourse = () => {
  const initialCourseState = {
    courseName: "",
    description: "",
    courseBanner: "",
    targetLearner: "",
    objectiveLearning: "",
    methodologyLearning: [
      {
        oneOnOneSessionWithMentor: false,
        readingMaterial: false,
        videoLearning: false,
        quiz: false,
        videoRecording: false,
        flexibleLearning: false,
      }
    ],
  }

  const [course, setCourse] = useState(initialCourseState)

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourse({
      ...course,
      [name]: value
    })

    console.log(course);
  }

  const handlerCancel = (e) => {
    e.preventDefault();
    setCourse(initialCourseState);
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <Sidebar activeNow="Manage Courses"/>
      <div className={classes.container}>
        <Header data="Manage Courses"/>
        <div className={classes.containerContent}>
          <h2 className={classes.title}>Add Courses</h2>
          <div className={classes.containerForm}>
            <h3 className={classes.titleForm}>Detail Courses</h3>
            <h6 className={classes.description}>Change or update your personal profile with valid information </h6>
            <form onSubmit={handlerSubmit}>
              <label htmlFor="courseName">Course Name</label>
              <input 
                type="text"
                id='courseName' 
                name='courseName' 
                placeholder='Course Title'
                required
                value={course.courseName} 
                onChange={handleInputChange}
                />
              <label htmlFor="description">Description</label>
              <textarea 
                name="description" 
                id="description" 
                rows="4"
                required
                value={course.description}
                onChange={handleInputChange}
                placeholder='Set the description of the course'>
              </textarea>
              <label htmlFor="targetLearner">Target Learner</label>
              <textarea 
                name="targetLearner" 
                id="targetLearner" 
                rows="3"
                required
                value={course.targetLearner}
                onChange={handleInputChange}
                placeholder="Who's the target learner">
              </textarea>
              <label htmlFor="objectiveLearning">Objective Learning</label>
              <textarea 
                name="objectiveLearning" 
                id="objectiveLearning" 
                rows="4"
                required
                value={course.objectiveLearning}
                onChange={handleInputChange}
                placeholder='Description of objective learning for sylabus learner'>
              </textarea>

              <div className={classes.buttonWrapper}>
                <Button className={classes.btnCancel} name="Cancel" onClick={handlerCancel} />
                <Button className={classes.btnSave} name="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCourse