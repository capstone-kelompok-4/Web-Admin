import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import EditMaterial from './EditMaterial';
import classes from "./UploadFiles.module.css";

export const ContextGlobal = createContext(null);

const UploadFiles = () => {
  const initialState = {
    name: "",
    type: "0",
    url: ""
  };

  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [material, setMaterial] = useState(initialState);
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCourses();
  }, [])

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

  const getAllSections = (course_id) => {
    const token = getToken();
    var configGetAllSections = {
      method: 'get',
      url: `${BASE_URL}/courses/${course_id}/sections`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllSections).then(res => {
      setSections(res.data.data)
    }).catch(err => {
      console.log(err)
    });
  }

  const getMaterialById = (course_id, section_id, material_id) => {
    const token = getToken();
    var configGetMaterialById = {
      method: 'get',
      url: `${BASE_URL}/courses/${course_id}/sections/${section_id}/materials/${material_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetMaterialById).then((res) => {
      setMaterial({
        name: res.data.data.name,
        type: res.data.data.type, 
        url: res.data.data.url,
      })
      setCourseId(course_id);
      getAllSections(course_id);
      setSectionId(section_id);
    }).catch( err => console.log(err));
  }

  const handleCourseName = (e) => {
    setCourseId(e.target.value)
    getAllSections(e.target.value);
  }
  const handleSectionName = (e) => {
    setSectionId(e.target.value)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setMaterial({
      ...material,
      [name]: value
    })
  }

  const handleSubmitMaterial = (e) => {
    e.preventDefault();
    console.log(editMode);

    if(material.name === "" || material.type === "" || material.url === "") {
      Swal.fire(
        "Warning!",
        "Data Tidak Boleh Kosong", 
        "warning"
      )
    } else {
      // This will executed axios post
      if(editMode !== true){
        const data = JSON.stringify({
          "name": material.name,
          "type": material.type,
          "url": material.url,
        });
    
        const token = getToken();
        const configAddMaterial = {
          method: 'post',
          url: `${BASE_URL}/courses/${courseId}/sections/${sectionId}/materials`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        };
    
        axios(configAddMaterial).then( async () => {
          await Swal.fire(
            "Success!",
            "Successfully Added Material",
            "success"
          )
          setMaterial(initialState);
          setCourseId("");
          setSectionId("");
          getAllCourses();
        }).catch(err => console.log(err));
      } else {
        // This will execute axios put
        const token = getToken()
        var data = JSON.stringify({
          "name": material.name,
          "type": material.type,
          "url": material.url
        });
        
        var configEditMaterial = {
          method: 'put',
          url: `${BASE_URL}/courses/${courseId}/sections/${sectionId}/materials/${materialId}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(configEditMaterial)
        .then(async () => {
          await Swal.fire(
            "Success!",
            "Successfully Edit Material",
            "success"
          )
          setMaterial(initialState);
          setCourseId("");
          setSectionId("");
          getAllCourses();
          setEditMode(false);
        })
        .catch(err => console.log(err));
      }
    }
  }

  // Handle Delete Material
  const handleDeleteMaterial = (course_id, section_id, material_id) => {
    const token = getToken();
    var configDeleteMaterial = {
      method: 'delete',
      url: `${BASE_URL}/courses/${course_id}/sections/${section_id}/materials/${material_id}`,
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
        axios(configDeleteMaterial).then(() => {
          getAllCourses();
        }).catch(err => console.log(err))
      }
    })
  }

  return (
    <ContextGlobal.Provider value={{courses: courses, setCourses: setCourses, getAllCourses, getAllSections, courseId: courseId, setCourseId: setCourseId, sectionId: sectionId, setSectionId: setSectionId, materialId: materialId, setMaterialId: setMaterialId ,loading: loading, editMode: editMode, setEditMode: setEditMode}}>
      <Sidebar activeNow="Upload Files"/>
      <div className={classes.container}>
        <Header data="Upload Files"/>
        <div className={classes.containerContent}>
          <h3>Files and Assets</h3>
          <p>Documents and attachments that have been uploaded as part of this courses.</p>
          <div className={classes.uploadFiles}>
            <form onSubmit={handleSubmitMaterial}>
              <label htmlFor="course">Course</label>
              <select name="course" id="course" style={{width: "45%"}} onChange={handleCourseName} value={courseId}>
                <option value="">Choose Course Name</option>
                {courses.map((course) => {
                  return(
                    <option value={course.id} key={course.id}>{course.name}</option>
                  )
                })}
              </select>

              <label htmlFor="section">Section</label>
              <select name="section" id="section" style={{width: "35%"}} onChange={handleSectionName} value={sectionId}>
                <option>Choose Section Name</option>
                {sections.map((section) => {
                  return(
                    <option value={section.id} key={section.id}>{section.name}</option>
                  )
                })}
              </select>

              <label htmlFor="name">File Name</label>
              <input type="text" id='name' name='name' placeholder='Materi Fundamental UI/UX' value={material.name} onChange={handleInputChange} />

              <label htmlFor="type">Type File</label>
              <select name="type" id="type" value={material.type} onChange={handleInputChange}>
                <option value="0">Video</option>
                <option value="1">Slide</option>
                <option value="2">Quiz</option>
              </select>

              <label htmlFor="url">Attachment</label>
              <p>Drop the attachment links below with permission access for public.</p>
              <textarea 
                name="url" 
                id="url" 
                rows="4"
                placeholder='https://docs.google.com/presentation/d/1i3i8EytwIaZMz0q82EW5d1KcV58DJk_eK2l8mJ3_xuA/edit?usp=sharing'
                value={material.url}
                onChange={handleInputChange}
              ></textarea>

              <div className={classes.action}>
                <Button className={classes.btnSave} name={editMode ? "Update" : "Save"}/>
              </div>
            </form>
          </div>
          <EditMaterial onDelete={handleDeleteMaterial} getMaterialById={getMaterialById}/>
        </div>
      </div>
      <Footer />
    </ContextGlobal.Provider>
  )
}

export default UploadFiles;