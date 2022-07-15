import React, { useContext, useState } from 'react'
import { CircularProgress } from '@mui/material';
import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import classes from "./EditSection.module.css";
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";
import { ContextGlobal } from './Section';

const EditSection = ({onDelete, getSectionById}) => {
  const dataFromParent = useContext(ContextGlobal);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  // Get Current Section
  const indexOfLastParticipant = currentPage * dataPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
  let currentCourse =  dataFromParent.courses.slice(indexOfFirstParticipant, indexOfLastParticipant);
  console.log(currentCourse);
  
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
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            entries
          </h5>
          <Search placeholder="Cari Section" className={classes.searchBar} onChange={handleSearch}/>
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
                    <td width="35%">Course</td>
                    <td width="10%">Section Number</td>
                    <td width="25%">Section Name</td>
                    <td width="10%">Data Uploaded</td>
                    <td width="10%">Last Updated</td>
                    <td width="10%" className='text-center'>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentCourse.map((course) => {
                      return(
                        <>
                          {
                            course.sections.filter((section) => {
                              if(searchTerm === "") {
                                return section
                              } else if (section.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return section 
                              } return false
                            }).map((section, idx) => {
                              return(
                                <tr key={idx}>
                                  <td>{course.name}</td>
                                  <td className='fw-bold'>0{section.number}</td>
                                  <td className='fw-bold'>{section.name}</td>
                                  <td>{showFormattedDate(section.created_at)}</td>
                                  { section.updated_at === null ? (
                                    <td>{showFormattedDate(section.created_at)}</td>
                                    ) : (
                                    <td>{showFormattedDate(section.updated_at)}</td>
                                  )}
                                  <td className='text-center'>
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

export default EditSection;