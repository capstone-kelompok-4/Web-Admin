import React, { useEffect, useState } from 'react'
import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import { getAllMaterials } from '../../Configs/MockAPI';
import classes from "./EditMaterial.module.css";
import MaterialIcon from "../../Assets/Images/material_icon.png";
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";

const EditMaterial = () => {

  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllMaterials().then(res => setMaterials(res.data)).catch(err => console.log(err))
  }, [materials])

  // Get Current Participants
  const indexOfLastParticipant = currentPage * dataPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
  let currentMaterials =  materials.slice(indexOfFirstParticipant, indexOfLastParticipant);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = (page) => setCurrentPage(page);
  const nextPage = (page) => setCurrentPage(page);
  const totalPage = Math.ceil(materials.length / dataPerPage);

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

  return (
    <>
      <div className={classes.container}>
        <div className={classes.filter}>
          <h5>Show 
            <select name="entries" id="entries" className={classes.dropdownBtn} value={dataPerPage} onChange={handleShowEntries}>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
            </select>
            entries
          </h5>
          <Search placeholder="Cari Materi" className={classes.searchBar} onChange={handleSearch}/>
        </div>
        <div className={classes.table}>
          <table>
            <thead>
              <tr>
                <td>File Name</td>
                <td>Course</td>
                <td>Data Uploaded</td>
                <td>Last Updated</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                currentMaterials.filter((material) => {
                  if(searchTerm === "") {
                    return material
                  } else if (material.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return material 
                  } return false
                }).map((material, idx) => {
                  return(
                    <tr key={idx}>
                      <td><img src={MaterialIcon} alt="avatar" width="40px" style={{borderRadius: "50%", marginRight: "10px"}}/>{material.name}</td>
                      <td>{material.course}</td>
                      <td>{showFormattedDate(material.createdAt)}</td>
                      <td>{showFormattedDate(material.lastUpdated)}</td>
                      <td>
                        <img src={EditIcon} alt="editIcon" style={{marginRight: "10px", cursor: "pointer"}}/>
                        <img src={DeleteIcon} alt="deleteIcon" style={{cursor: 'pointer'}} />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className={classes.pagination}>
        <h6>Showing {currentPage} to {totalPage} of {materials.length} entries</h6>
        <Pagination dataPerPage={dataPerPage} totalData={materials.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
      </div>
    </>
  )
}

export default EditMaterial