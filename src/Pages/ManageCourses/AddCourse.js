import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import { storage } from '../../Firebase/Firebase';
import classes from "./AddCourse.module.css";

const AddCourse = () => {

  useEffect(() => {
    const token = getToken();
    var configGetAllSpecializations = {
      method: 'get',
      url: `${BASE_URL}/specializations`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(configGetAllSpecializations).then(res => setAllSpecialization(res.data.data)).catch(err => console.log(err));

  }, [])

  const initialCourseState = {
    courseName: "",
    description: "",
    courseBanner: "",
    targetLearner: "",
    objectiveLearning: "",
    methodologyLearning: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  }

  const [course, setCourse] = useState(initialCourseState);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const [url, setUrl] = useState("");
  const imageRef = useRef();


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourse({
      ...course,
      [name]: value
    })
  }

  // handleSpecializationChange
  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value)
  }

  const uploadImageHandler = (e) => {
    const files = imageRef.current.files;
    const file = files[0];
    const fileRef = ref(storage, `course-banner/${file.name}`);
    setSelectedFile(file.name);
    uploadBytes(fileRef, file)
      .then(() => {
        getDownloadURL(fileRef).then((url) => {
          setUrl(url);
        });
        setCourse({
          ...course, 
          courseBanner: url
        })
      });
    imageRef.current.files = e.target.files;
    e.target.files = files;
  }

  // Handle Checkbox Methodology Learning
  const handleChangeOneOnOneSessionWithMentor = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning, 
        0: !course.methodologyLearning.oneOnOneSessionWithMentor
      }
    })
  }
  const handleChangeReadingMaterial = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning,
        1: !course.methodologyLearning.readingMaterial
      },
    })
  }
  const handleChangeVideoLearning = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning,
       2: !course.methodologyLearning.videoLearning,
      },
    })
  }
  const handleChangeQuiz = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning,
        3: !course.methodologyLearning.quiz,
      },
    })
  }
  const handleChangeVideoRecording = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning,
        4: !course.methodologyLearning.videoRecording,
      },
    })
  }
  const handleChangeFlexibleLearing = () => {
    setCourse({
      ...course, 
      methodologyLearning: {
        ...course.methodologyLearning,
        5: !course.methodologyLearning.flexibleLearning
      },
    })
  }
  //  Handle Checkbox Methodology Learning

  // Handle Button Cancel
  const handlerCancel = (e) => {
    e.preventDefault();
    setCourse(initialCourseState);
    setSelectedFile("");
  }

  // Handle Button Submit
  const handlerSubmit = (e) => {
    e.preventDefault()
    const allKey = Object.keys(course.methodologyLearning);
    const listFilterKey = allKey.filter(key => course.methodologyLearning[key])
    const convertedTargetLearner = course.targetLearner.split("\n")
    const convertedObjectiveLearner = course.targetLearner.split("\n")

    var data = JSON.stringify({
      "name": course.courseName,
      "banner_url": url,
      "description": course.description,
      "target_learner": convertedTargetLearner,
      "objective_learner": convertedObjectiveLearner,
      "methodology_learnings": listFilterKey,
      "specialization_id": specialization
    })
    const token = getToken();
    var configAddCourse = {
      method: 'post',
      url: `${BASE_URL}/courses`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(configAddCourse)
    .then(async () => {
      await Swal.fire(
        'Success!',
        'Successfully Added Course!',
        'success'
      )
      navigate("/manage_courses")
    })
    .catch(err => console.log(err));
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
              
              <label htmlFor="courseBanner">Course Banner</label>
              <label
                htmlFor="courseBanner"
                style={{ padding: "10px 25px", margin: "20px 0", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#E7E7E7", display: "inline-block", cursor: "pointer", color: "#0D2341", opacity: ".9"}}
              > Choose File
                <input 
                  ref={imageRef}
                  type="file" 
                  name="courseBanner" 
                  id="courseBanner"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  style={{display: "none"}}
                  onChange={uploadImageHandler} 
                />
              </label>
              <span style={{color: "#0D2341", fontSize: "16px", fontFamily: "Poppins", marginLeft: "10px", opacity: ".8"}}>
                {selectedFile ? selectedFile : "No Chosen File"}
              </span>

              <label htmlFor="specialization">Specialization</label>
              <select value={specialization} name="specialization" id="specialization" onChange={handleSpecializationChange} required>
                <option value="" hidden>Set Specialization</option>
                {allSpecialization.map(specialization => {
                  return(
                    <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                  )
                })}
              </select>

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
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton1" checked={course.methodologyLearning.oneOnOneSessionWithMentor} onChange={handleChangeOneOnOneSessionWithMentor}
/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton1">
                      1 on 1 Session With Mentor
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton2" checked={course.methodologyLearning.readingMaterial} onChange={handleChangeReadingMaterial}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton2">
                      Reading Materials
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton3" checked={course.methodologyLearning.videoLearning} onChange={handleChangeVideoLearning}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton3">
                      Video Learning
                    </label>
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton4" checked={course.methodologyLearning.quiz} onChange={handleChangeQuiz}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Quiz
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton5" checked={course.methodologyLearning.videoRecording} onChange={handleChangeVideoRecording}/>
                    <label className={`form-check-label ${classes.labelForCheck}`} htmlFor="radioButton4">
                      Video Recording
                    </label>
                  </div>
                  <div className={`form-check ${classes.formRadio}`}>
                    <input className={`form-check-input ${classes.accent}`} type="checkbox" name="methodologyLearning" id="radioButton6" checked={course.methodologyLearning.flexibleLearning} onChange={handleChangeFlexibleLearing}/>
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

export default AddCourse