import React, { useContext, useState } from 'react'
import { CircularProgress } from '@mui/material';
import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import classes from "./EditMaterial.module.css";
import MaterialIcon from "../../Assets/Images/material_icon.png";
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";
import { ContextGlobal } from './UploadFiles';

const EditMaterial = ({onDelete, getMaterialById}) => {
  const dataFromParent = useContext(ContextGlobal);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");

  // Get Current Participants
  const indexOfLastParticipant = currentPage * dataPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
  let currentCourses =  dataFromParent.courses.slice(indexOfFirstParticipant, indexOfLastParticipant);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = (page) => setCurrentPage(page);
  const nextPage = (page) => setCurrentPage(page);
  const totalPage = Math.ceil(dataFromParent.courses.length / dataPerPage);

  // Handle Show Entries
  const handleShowEntries = (e) => {
    setDataPerPage(e.target.value);
  }

  // Handle Search Bar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  
  // Format Date
  const showFormattedDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    return new Date(date).toLocaleString("en-US", options)
  }

  const deleteHandler = (course_id, section_id, material_id) => {
    onDelete(course_id, section_id, material_id);
  }

  const editHandler = (course_id, section_id, material_id) => {
    getMaterialById(course_id, section_id, material_id);
    dataFromParent.setCourseId(course_id);
    dataFromParent.setSectionId(section_id);
    dataFromParent.setMaterialId(material_id);
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.filter}>
          <h5>Show 
            <select 
              name="entries" 
              id="entries" 
              className={classes.dropdownBtn} 
              value={dataPerPage} 
              onChange={handleShowEntries}
            >
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            entries
          </h5>
          <Search placeholder="Cari Materi" className={classes.searchBar} onChange={handleSearch}/>
        </div>
        <div className={classes.table}>
          {
            dataFromParent.loading ? (
              <div className={classes.spinnerContain}>
                <CircularProgress style={{ width: "200px", height: "200px", color: "#FF6C00" }} />
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <td>File Name</td>
                    {/* <td>Section</td> */}
                    <td>Course</td>
                    <td>Data Uploaded</td>
                    <td>Last Updated</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentCourses.map((course) => {
                      return(
                        <>
                          {
                            course.sections.map((section) => {
                              return(
                                <>
                                  {
                                    section.materials.filter((material) => {
                                      if(searchTerm === "") {
                                        return material
                                      } else if (material.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return material 
                                      } return false
                                    }).map((material, idx) => {
                                      return(
                                        <tr key={idx}>
                                          <td><img src={MaterialIcon} alt="avatar" width="40px" style={{borderRadius: "50%", marginRight: "10px"}}/>{material.name}</td>
                                          {/* <td>{section.name}</td> */}
                                          <td>{course.name}</td>
                                          <td>{showFormattedDate(material.created_at)}</td>
                                          {
                                            material.updated_at === null ? (
                                              <td>{showFormattedDate(material.created_at)}</td>
                                              ) : (
                                              <td>{showFormattedDate(material.updated_at)}</td>
                                            )
                                          }
                                          <td>
                                            <img src={EditIcon} alt="editIcon" style={{marginRight: "10px", cursor: "pointer"}} 
                                              onClick={() => {
                                                editHandler(course.id, section.id, material.id);
                                                dataFromParent.setEditMode(true);
                                              }}
                                            />
                                            <img src={DeleteIcon} alt="deleteIcon" style={{cursor: 'pointer'}} onClick={() => deleteHandler(course.id, section.id, material.id)} />
                                          </td>
                                        </tr>
                                      )
                                    })
                                  }
                                </>
                              )
                            })
                          }
                        </>
                      )
                    })
                  }
                </tbody>
              </table>
            )
          }
        </div>
      </div>
      <div className={classes.pagination}>
        <h6>Showing {currentPage} to {totalPage} of {dataFromParent.courses.length} entries</h6>
        <Pagination dataPerPage={dataPerPage} totalData={dataFromParent.courses.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
      </div>
    </>
  )
}

export default EditMaterial