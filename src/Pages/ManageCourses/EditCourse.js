import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import { getCourseByID } from '../../Configs/MockAPI';
import classes from "./AddCourse.module.css";

const EditCourse = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState({})

  const [methodologyLearning, setMethodologyLearning] = useState({
    '1 On 1 Session With Mentor': false,
    'Reading Materials': false,
    'Video Learning': false,
    'Quiz': false,
    'Video Recording': false,
    'Flexible Learning': false,
  })

  useEffect(() => {
    getCourseByID(course_id).then(res => setCourse(res.data)).catch(err => console.error(err.message));
  }, [course_id])


  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    if(name === "img"){
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

  // Handle Checkbox 
  const handleChangeOneOnOneSessionWithMentor = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      '1 On 1 Session With Mentor': !methodologyLearning['1 On 1 Session With Mentor'],
    })
    console.log(methodologyLearning);
  }
  const handleChangeReadingMaterial = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      'Reading Materials': !methodologyLearning['Reading Materials'],
    })
    console.log(methodologyLearning)
  }
  const handleChangeVideoLearning = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      'Video Learning': !methodologyLearning['Video Learning'],
    })
    console.log(methodologyLearning)
  }
  const handleChangeQuiz = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      'Quiz': !methodologyLearning['Quiz'],
    })
    console.log(methodologyLearning)
  }
  const handleChangeVideoRecording = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      'Video Recording': !methodologyLearning['Video Recording'],
    })
  }
  const handleChangeFlexibleLearing = () => {
    setMethodologyLearning({
      ...methodologyLearning, 
      'Flexible Learning': !methodologyLearning['Flexible Learning'],
    })
  }
  // Handle Checkbox 

  const handlerCancel = (e) => {
    e.preventDefault();
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    const allKey = Object.keys(methodologyLearning);
    const listFilterKey = allKey.filter(key => methodologyLearning[key])
    console.log(listFilterKey);

    setCourse({
      ...course, 
      methodology_learning: listFilterKey
    })
  }
  return (
    <>
      <Sidebar activeNow="Manage Courses"/>
      <div className={classes.container}>
        <Header data="Manage Courses"/>
        <div className={classes.containerContent}>
          <h2 className={classes.title}>Edit Courses</h2>
          <div className={classes.containerForm}>
            <h3 className={classes.titleForm}>Detail Courses</h3>
            <h6 className={classes.description}>Change or update your personal profile with valid information </h6>
            <form onSubmit={handlerSubmit}>
              <label htmlFor="title">Course Name</label>
              <input 
                type="text"
                id='title' 
                name='title' 
                placeholder='Course Title'
                required
                value={course.title} 
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
                id='sections' 
                name='sections' 
                placeholder='e.g 10 section'
                required
                value={course.sections} 
                onChange={handleInputChange}
              />
              <label htmlFor="img">Course Banner</label>
              <input 
                type="file" 
                name="img" 
                id="img"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                onChange={handleInputChange} 
              />
              <label htmlFor="target_learner">Target Learner</label>
              <textarea 
                name="target_learner" 
                id="target_learner" 
                rows="3"
                required
                value={course.target_learner}
                onChange={handleInputChange}
                placeholder="Who's the target learner">
              </textarea>
              <label htmlFor="objective_learner">Objective Learning</label>
              <textarea 
                name="objective_learner" 
                id="objective_learner" 
                rows="4"
                required
                value={course.objective_learner}
                onChange={handleInputChange}
                placeholder='Description of objective learning for sylabus learner'>
              </textarea>
              <label htmlFor="methodologyLearning">Methodology Learning</label>
              <div className={classes.radioWrapper}>
                <div className={classes.left}>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton1" checked={methodologyLearning['1 On 1 Session With Mentor']} onChange={handleChangeOneOnOneSessionWithMentor}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton1">
                      1 on 1 Session With Mentor
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton2" checked={methodologyLearning['Reading Materials']} onChange={handleChangeReadingMaterial} />
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton2">
                      Reading Materials
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton3" checked={methodologyLearning['Video Learning']} onChange={handleChangeVideoLearning}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton3">
                      Video Learning
                    </label>
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton4" checked={methodologyLearning['Quiz']} onChange={handleChangeQuiz}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Quiz
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton5" checked={methodologyLearning['Video Recording']} onChange={handleChangeVideoRecording}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Video Recording
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton6" checked={methodologyLearning['Flexible Learning']} onChange={handleChangeFlexibleLearing}/>
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
      <Footer />
    </>
  )
}

export default EditCourse;