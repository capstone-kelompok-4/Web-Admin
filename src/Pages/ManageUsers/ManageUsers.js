import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar';
import Search from '../../Components/Search/Search';
import classes from "./ManageUsers.module.css";
import Footer from "../../Components/Footer/Footer"
import Pagination from '../../Components/Pagination/Pagination';

import AddIcon from "../../Assets/Icons/addIcon.svg";
import DeleteIcon from "../../Assets/Icons/delete_icon.svg";
import EditIcon from "../../Assets/Icons/edit_icon.svg";
import DefaultProfile from "../../Assets/Images/default-profile.jpg";
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import Swal from 'sweetalert2';


function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [specialist, setSpecialist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = () => {
    setLoading(true);
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/users/all`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(res => {
      setLoading(false);
      setUsers(res.data.data);
    })
    .catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  const onlyRoleUser = users.filter(user => user.roles[0].name === 'ROLE_USER');
  
  // Get Current Participants
  if(specialist === ""){
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var currentUsers =  onlyRoleUser.slice(indexOfFirstParticipant, indexOfLastParticipant);
  } else {
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var filtered = onlyRoleUser.filter(user => user?.user_specialization?.name.toLowerCase() === specialist.toLowerCase())
    currentUsers = filtered.slice(indexOfFirstParticipant, indexOfLastParticipant);
  }
  
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

  const handleNavigateEdit = (user_id) => {
    navigate(`/manage_users/edit_user/${user_id}`)
  }

  const handleDeleteUser = (user_id) => {
    const token = getToken();
    var configDeleteSection = {
      method: 'delete',
      url: `${BASE_URL}/users/${user_id}`,
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
    }).then((result) => {
      if (result.isConfirmed) {
        axios(configDeleteSection).then(res => {
          console.log(res.data)
          getAllUsers();
        }).catch(err => console.log(err))
        Swal.fire(
          'Deleted!',
          'User data has been deleted.',
          'success'
        )
      }
    })
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
                      <option value="7">7</option>
                      <option value="5">5</option>
                    </select>
                     entries</h5>
                    <div className='d-flex align-items-center'>
                      <h5 className='m-0'>Filter Specialization</h5>
                      <select name="role" id="role" className={classes.dropdownBtn} value={specialist} onChange={handleFilterSpecialist}>
                        <option value="">Set Role</option>
                        <option value="frontend developer">Frontend Developer</option>
                        <option value="backend developer">Backend Developer</option>
                        <option value="quality engineer">Quality Engineer</option>
                        <option value="ui/ux designer">UI/UX Designer</option>
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
                {
                  loading ? (
                    <div className={classes.spinnerContain}>
                      <CircularProgress style={{ width: "200px", height: "200px", color: "#FF6C00" }} />
                    </div>
                  ) : (
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
                            if(searchTerm === "") {
                              return user
                            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return user 
                            } return false
                          }).map((user, idx) => {
                            return(
                              <tr key={idx}>
                                <td>
                                    {
                                        user?.image_url === "" || user?.image_url === null ? (
                                            <img src={DefaultProfile} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                        ) : (
                                            <img src={user?.image_url} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                        )
                                    }
                                </td>
                                <td>&emsp;{idx+1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.user_specialization?.name}</td>
                                <td>{user?.username}</td>
                                <td>{showFormattedDate(user.created_at)}</td>
                                <td>
                                  <img src={DeleteIcon} alt="deleteIcon" style={{cursor: 'pointer'}} onClick={() => handleDeleteUser(user.id)}/>
                                  <img src={EditIcon} alt="editIcon" style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => handleNavigateEdit(user.id)}/>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  )
                }
              </div>
            </div>
          </div>
          {
            specialist === "" ? (
              <div className={classes.pagination}>
                <h6>Showing {currentPage} to {totalPage} of {users.length} entries</h6>
                <Pagination dataPerPage={dataPerPage} totalData={users.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
              </div>
            ) : (
              <div className={classes.pagination}>
                <h6>Showing {currentPage} to {totalPage} of {filtered.length} entries</h6>
                <Pagination dataPerPage={dataPerPage} totalData={filtered.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ManageUsers