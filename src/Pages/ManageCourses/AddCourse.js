import React, { useState } from 'react'
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import classes from "./AddCourse.module.css";

const AddCourse = () => {
  const initialCourseState = {
    courseName: "",
    description: "",
    section: "",
    courseBanner: "",
    targetLearner: "",
    objectiveLearning: "",
    methodologyLearning: {
      oneOnOneSessionWithMentor: false,
      readingMaterial: false,
      videoLearning: false,
      quiz: false,
      videoRecording: false,
      flexibleLearning: false,
    }
  }

  const [course, setCourse] = useState(initialCourseState)

  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    if(name === "courseBanner"){
      setCourse({
        ...course,
        [name]: files[0]
      })
    } else if (name === "methodologyLearning") {
  
    } else {
      setCourse({
        ...course,
        [name]: value
      })
    }

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
              <label htmlFor="section">Section</label>
              <input 
                type="text"
                id='section' 
                name='section' 
                placeholder='e.g 10 section'
                required
                value={course.section} 
                onChange={handleInputChange}
              />
              <label htmlFor="courseBanner">Course Banner</label>
              <input 
                type="file" 
                name="courseBanner" 
                id="courseBanner"
                onChange={handleInputChange} 
                accept="image/png, image/jpg, image/gif, image/jpeg" 
              />
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
              <label htmlFor="methodologyLearning">Methodology Learning</label>
              <div className={classes.radioWrapper}>
                <div className={classes.left}>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton1"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton1">
                      1 on 1 Session With Mentor
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton2"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton2">
                      Reading Materials
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton3"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton3">
                      Video Learning
                    </label>
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton4"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Quiz
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton5"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Video Recording
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton6"/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Flexible Learning
                    </label>
                  </div>
                </div>
              </div>
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