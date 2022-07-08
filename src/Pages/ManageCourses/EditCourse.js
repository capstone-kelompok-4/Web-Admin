import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import { storage } from '../../Firebase/Firebase';
import classes from "./AddCourse.module.css";

const EditCourse = () => {
  const imageRef = useRef();
  const { course_id } = useParams();
  const [course, setCourse] = useState({})
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [methodologyLearning, setMethodologyLearning] = useState({
    '1 On 1 Session With Mentor': false,
    'Reading Materials': false,
    'Video Learning': false,
    'Quiz': false,
    'Video Recording': false,
    'Flexible Learning': false,
  })

  useEffect(() => {
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/courses/${course_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config).then(res => setCourse(res.data.data)).catch(err => console.log(err));

  }, [course_id])


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourse({
      ...course,
      [name]: value
    })

    console.log(course);
  }

  // Upload image handler
  const uploadImageHandler = (e) => {
    const files = imageRef.current.files;
    const file = files[0];
    setSelectedFile(file.name);
    const fileRef = ref(storage, `course-banner/${file.name}`);
    setSelectedFile(file.name);
    uploadBytes(fileRef, file)
      .then(() => {
        getDownloadURL(fileRef).then((url) => {
          setUrl(url);
        });
      });
    imageRef.current.files = e.target.files;
    e.target.files = files;
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

  // Handler Cancel
  const handlerCancel = (e) => {
    e.preventDefault();
    setSelectedFile("");
  }

  // Handler Submit
  const handlerSubmit = (e) => {
    e.preventDefault()
    const allKey = Object.keys(methodologyLearning);
    const listFilterKey = allKey.filter(key => methodologyLearning[key])
    console.log(listFilterKey);

    setCourse({
      ...course, 
      target_learner: course.target_learner.split("\n"),
      objective_learner: course.objective_learner.split("\n"),
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
                value={course.name} 
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

              <label htmlFor="img">Course Banner</label>
              <label
                htmlFor="img"
                style={{ padding: "10px 25px",margin: "20px 0", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#E7E7E7",display: "inline-block", cursor: "pointer", color: "#0D2341", opacity: ".9"}}
              > Choose File
                <input 
                  ref={imageRef}
                  type="file" 
                  name="img" 
                  id="img"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  style={{display: "none"}}
                  onChange={uploadImageHandler} 
                />
              </label>
              <span style={{color: "#0D2341", fontSize: "16px", fontFamily: "Poppins", marginLeft: "10px", opacity: ".8"}}>
                {selectedFile ? selectedFile : "No Chosen File"}
              </span>

              <label htmlFor="target_learner">Target Learner</label>
              <textarea 
                name="target_learner" 
                id="target_learner" 
                rows="3"
                required
                value={course?.target_learner}
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