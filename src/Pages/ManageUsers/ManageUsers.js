import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar';
import Search from '../../Components/Search/Search';
import classes from "./ManageUsers.module.css";
import AddIcon from "../../Assets/Icons/addIcon.svg";
import Footer from "../../Components/Footer/Footer"
import { getAllUsers } from '../../Configs/MockAPI';
import Pagination from '../../Components/Pagination/Pagination';
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [specialist, setSpecialist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data)).catch(err => console.log(err))
  }, [users])

  // Get Current Participants
  const indexOfLastParticipant = currentPage * dataPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
  let currentUsers =  users.slice(indexOfFirstParticipant, indexOfLastParticipant);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = (page) => setCurrentPage(page);
  const nextPage = (page) => setCurrentPage(page);
  const totalPage = Math.ceil(users.length / dataPerPage);

  // Handle Show Entries
  const handleShowEntries = (e) => {
    setDataPerPage(e.target.value);
  }

  // Handle Filter Specialization
  const handleFilterSpecialist = (e) => {
    setSpecialist(e.target.value)
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
      <Sidebar activeNow="Manage Users"/>
      <div className={classes.container}>
        <Header data="Manage Users" />
        <div className={classes.containerContent}>
          <div className={classes.infoWrapper}>
            <div className={classes.title}>
              <h2>All Users</h2>
            </div>
            <div className={`px-4 py-5 rounded-3 ${classes.stylingcontent}`}>
              <div className={classes.stylingaction}>
                <div className={classes.actionLeft}>
                  <h4>Users List</h4>
                  <div className='d-grid gap-4' style={{fontFamily: "Poppins"}}>
                    <h5 className='mb-0'>Show 
                    <select name="entries" id="entries" className={classes.dropdownBtn} value={dataPerPage} onChange={handleShowEntries}>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                    </select>
                     entries</h5>
                    <div className='d-flex align-items-center'>
                      <h5 className='m-0'>Filter Specialization</h5>
                      <select name="role" id="role" className={classes.dropdownBtn} value={specialist} onChange={handleFilterSpecialist}>
                        <option value="">Set Role</option>
                        <option value="designer">Designer</option>
                        <option value="management">Management</option>
                        <option value="engineer">Engineer</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={classes.actionright}>
                  <Link to="/manage_users/add_user">
                    <Button className={classes.addBtn} name="Add User" icon={AddIcon}/>
                  </Link>
                  <Search placeholder="Search User" className={classes.searchBar} onChange={handleSearch}/>
                </div>
              </div>
              <div className={classes.table}>
                <table>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td width="5%">Roll No.</td>
                      <td>Full Name</td>
                      <td>Specialist</td>
                      <td width="25%">Email</td>
                      <td  width="15%">Admission Date</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentUsers.filter((user) => {
                        if(specialist === "") {
                          return user
                        } else if (user.specialist.toLowerCase() === specialist.toLowerCase()) {
                          return user
                        } return false
                      }).filter((user) => {
                        if(searchTerm === "") {
                          return user
                        } else if (user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return user 
                        } return false
                      }).map((user, idx) => {
                        return(
                          <tr key={idx}>
                            <td><img src={user.avatar} alt="avatar" width="50px" style={{borderRadius: "50%"}}/></td>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.specialist}</td>
                            <td>{user.email}</td>
                            <td>{showFormattedDate(user.createdAt)}</td>
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
          </div>
          <div className={classes.pagination}>
            <h6>Showing {currentPage} to {totalPage} of {users.length} entries</h6>
            <Pagination dataPerPage={dataPerPage} totalData={users.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ManageUsers