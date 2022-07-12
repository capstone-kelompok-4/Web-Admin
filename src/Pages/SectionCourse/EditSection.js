import React, { useContext, useState } from 'react'
// import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import classes from "./EditSection.module.css";
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";
import { ContextGlobal } from './Section';
// import { BASE_URL, getToken } from '../../Configs/APIAuth';
// import Swal from 'sweetalert2';
// import axios from 'axios';

const EditSection = ({onDelete, getSectionById}) => {
  const dataFromParent = useContext(ContextGlobal);

  // const [courses, setCourses] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);
  // const [searchTerm, setSearchTerm] = useState("");

  // Get Current Section
  // const indexOfLastParticipant = currentPage * dataPerPage;
  // const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
  // let allSections = [];
  // courses.map((course) => {
  //   return(
  //     course.sections.map(section => {
  //       return(
  //         allSections.push(section)
  //       )
  //     })
  //   )
  // })
  // let currentCourses =  courses.slice(indexOfFirstParticipant, indexOfLastParticipant);
  
  // Change Page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const prevPage = (page) => setCurrentPage(page);
  // const nextPage = (page) => setCurrentPage(page);
  // let allSectionsLength = 0;
  // courses.map((course) => {
  //   return(
  //     allSectionsLength += course.sections.length
  //   )
  // })
  // const totalPage = Math.ceil(allSectionsLength / dataPerPage);

  // Handle Show Entries
  const handleShowEntries = (e) => {
    setDataPerPage(e.target.value);
  }

  // Handle Search Bar
  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // }
  
  // Format Date
  const showFormattedDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    return new Date(date).toLocaleString("en-US", options)
  }

  const deleteHandler = (course_id, section_id) => {
    onDelete(course_id, section_id);
  }

  const editHandler = (course_id, section_id) => {
    getSectionById(course_id, section_id)
    dataFromParent.setCourseId(course_id);
    dataFromParent.setSectionId(section_id);
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.filter}>
          <h5>Show 
            <select name="entries" id="entries" className={classes.dropdownBtn} value={dataPerPage} onChange={handleShowEntries}>
              <option value="9">9</option>
              <option value="7">7</option>
              <option value="5">5</option>
              <option value="3">3</option>
            </select>
            entries
          </h5>
          <Search placeholder="Cari Section" className={classes.searchBar}/>
        </div>
        <div className={classes.table}>
          <table>
            <thead>
              <tr>
                <td>Section Name</td>
                <td>Course</td>
                <td>Data Uploaded</td>
                <td>Last Updated</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                dataFromParent.courses.map((course) => {
                  return(
                    <>
                      {
                        course.sections.map((section, idx) => {
                          return(
                            <tr key={idx}>
                              <td>{section.name}</td>
                              <td>{course.name}</td>
                              <td>{showFormattedDate(section.created_at)}</td>
                              { section.updated_at === null ? (
                                <td>{showFormattedDate(section.created_at)}</td>
                                ) : (
                                <td>{showFormattedDate(section.updated_at)}</td>
                              )}
                              <td>
                                <img 
                                  src={EditIcon} 
                                  alt="editIcon" 
                                  style={{marginRight: "10px", cursor: "pointer"}} 
                                  onClick={() => {
                                    editHandler(course.id, section.id)
                                    dataFromParent.setEditMode(true);
                                  }}
                                />
                                <img src={DeleteIcon} alt="deleteIcon" style={{cursor: 'pointer'}} onClick={() => deleteHandler(course.id, section.id)}/>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className={classes.pagination}>
        <h6>Showing {currentPage} to {totalPage} of {allSections.length} entries</h6>
        <Pagination dataPerPage={dataPerPage} totalData={materials.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
      </div> */}
    </>
  )
}

export default EditSection;