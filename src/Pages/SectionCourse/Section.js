import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Swal from 'sweetalert2'
import Button from '../../Components/Button/Button'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import { BASE_URL, getToken } from '../../Configs/APIAuth'
import EditSection from './EditSection'
import classes from "./Section.module.css"

export const ContextGlobal = createContext(null);

const Section = () => {
  const initialState = {
    number: "",
    name: "",
  }
  const [courses, setCourses] = useState([]);
  const [section, setSection] = useState(initialState);
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState({
    number: "", 
    name: "", 
    course: ""
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getAllCourses();
  }, [])

  const getSectionById = (course_id, section_id) => {
    const token = getToken();
    var configGetSectionById = {
      method: 'get',
      url: `${BASE_URL}/courses/${course_id}/sections/${section_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetSectionById).then(res => {
      setSection({
        number: res.data.data.number,
        name: res.data.data.name
      })
      setCourseId(course_id);
    }).catch( err => console.log(err));
  }

  const getAllCourses = () => {
    setLoading(true);
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/courses`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(config).then(res => {
      setLoading(false);
      setCourses(res.data.data)
    }).catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
   
      switch (name) {
        case "number":
          if (!value) {
            stateObj[name] = "Section Number Tidak Boleh Kosong !";
          }
          break;
   
        case "name":
          if (!value) {
            stateObj[name] = "Nama Section Tidak Boleh Kosong !";
          } 
          break;

        case "course":
          if (!value) {
            stateObj[name] = "Nama Course Tidak Boleh Kosong !";
          } 
          break;

        default:
          break;
      }
   
      return stateObj;
    });
    setSection({
      ...section, 
      [name]: value
    })
  }

  const handleCourseName = (e) => {
    setCourseId(e.target.value)
  }

  // Handle Submit Section
  const handleSubmitSection = (e) => {
    e.preventDefault();
    // Edit mode value get from glabal context
    console.log(editMode); 

    if(section.number === "" || section.name === "" || courseId === "") {
      Swal.fire(
        "Warning!",
        "Data Tidak Boleh Kosong", 
        "warning"
      )
    } else {
      // This will executed axios post
      if(editMode !== true) {
        const data = JSON.stringify({
          "number": section.number,
          "name": section.name
        });
    
        const token = getToken();
        const configAddSection = {
          method: 'post',
          url: `${BASE_URL}/courses/${courseId}/sections`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        };
    
        axios(configAddSection).then( async () => {
          await Swal.fire(
            "Success!",
            "Successfully Added Section",
            "success"
          )
          setSection(initialState);
          setCourseId("");
          getAllCourses();
        }).catch(err => console.log(err));
      } else { 
        //This code below will executed axios post
        const token = getToken()
        var data = JSON.stringify({
          "number": section.number,
          "name": section.name,
        });
        
        var configEditSection = {
          method: 'put',
          url: `${BASE_URL}/courses/${courseId}/sections/${sectionId}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(configEditSection)
        .then(async () => {
          await Swal.fire(
            "Success!",
            "Successfully Edit Section",
            "success"
          )
          setSection(initialState);
          setCourseId("");
          getAllCourses();
          setEditMode(false);
        })
        .catch(err => console.log(err));
      }
    }
  }

  // Handle Delete Section
  const handleDeleteSection = (course_id, section_id) => {
    const token = getToken();
    var configDeleteSection = {
      method: 'delete',
      url: `${BASE_URL}/courses/${course_id}/sections/${section_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        axios(configDeleteSection).then(() => {
          getAllCourses();
        }).catch(err => console.log(err))
      }
    })
  }

  return (
    <ContextGlobal.Provider value={{courses: courses, setCourses: setCourses, getAllCourses, editMode: editMode, setEditMode: setEditMode, courseId: courseId, setCourseId: setCourseId, sectionId: sectionId, setSectionId: setSectionId, loading: loading}}>
      <Sidebar activeNow="Section Course"/>
      <div className={classes.container}>
        <Header data="Section Course"/>
        <div className={classes.containerContent}>
          <h3>Section Course</h3>
          <p>Setting the part section of the course to make easier uploading files.</p>
          <div className={classes.sectionCourse}>
            <form onSubmit={handleSubmitSection}>
              <label htmlFor="course">Course</label>
              <select name="course" id="course" style={{width: "45%"}} onChange={handleCourseName} value={courseId}>
                <option value="">Choose Course Name</option>
                {courses.map((course) => {
                  return(
                    <option value={course.id} key={course.id} >{course.name}</option>
                  )
                })}
              </select>
              {error.course && <h5 className={classes.error}>{error.course}</h5>}
              
              <label htmlFor="number">Section Number</label>
              <input 
                type="number" 
                placeholder='e.g  8' 
                id='number' 
                name='number' 
                style={{width: "15%"}} 
                value={section.number} 
                onChange={handleInputChange}
              />
              {error.number && <h5 className={classes.error}>{error.number}</h5>}

              <label htmlFor="name">Section Name</label>
              <input 
                type="text" 
                placeholder='e.g Materi Fundamental UI/UX' 
                id='name' 
                name='name' 
                value={section.name} 
                onChange={handleInputChange}
              />
              {error.name && <h5 className={classes.error}>{error.name}</h5>}

              <div className={classes.action}>
                <Button className={classes.btnSave} name={editMode ? "Update":"Submit"}/>
              </div>
            </form>
          </div>
          <EditSection onDelete={handleDeleteSection} getSectionById={getSectionById}/>
        </div>
      </div>
      <Footer />
    </ContextGlobal.Provider>
  )
}

export default Section