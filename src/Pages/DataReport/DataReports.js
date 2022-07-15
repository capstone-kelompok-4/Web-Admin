import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import { BASE_URL, getToken } from '../../Configs/APIAuth';
import { getAllUsers } from '../../Configs/MockAPI';
import classes from "./DataReports.module.css";
import DefaultProfile from "../../Assets/Images/default-profile.jpg";

const DataReports = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [specialist, setSpecialist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getAllUsers().then(res => setUsers(res.data)).catch(err => console.log(err))
  // }, [users])

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
    var filtered = onlyRoleUser.filter(user => user.specialist.toLowerCase() === specialist.toLowerCase())
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
  
  return (
    <>
      <Sidebar activeNow="Data Reports" />
      <div className={classes.container}>
        <Header data="Data Reports" />
        <div className={classes.containerContent}>
          <h3>Report Users</h3>
          <div className={classes.tableUsers}>
            <div className={classes.filterSection}>
              <div className={classes.top}>
                <h5>Show 
                  <select name="entries" id="entries" className={classes.dropdownBtn} value={dataPerPage} onChange={handleShowEntries}>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                  </select>
                entries</h5>
                <Search placeholder="Cari User" className={classes.searchBar} onChange={handleSearch}/>
              </div>
              <div className={classes.bottom}>
                <h5>Filter Specialization</h5>
                <select name="role" id="role" className={classes.dropdownBtn} value={specialist} onChange={handleFilterSpecialist}>
                  <option value="">Set Role</option>
                  <option value="designer">Designer</option>
                  <option value="management">Management</option>
                  <option value="engineer">Engineer</option>
                  <option value="manager">Manager</option>
                </select>
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
                        <td>Roll No.</td>
                        <td>Full Name</td>
                        <td>Specialist</td>
                        <td width="25%">Email</td>
                        <td>Reports</td>
                        <td>Certificates</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentUsers.filter((user) => {
                          if(searchTerm === "") {
                            return user
                          } else if (user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return user 
                          } return false
                        }).map((user, idx) => {
                          return(
                            <tr key={idx}>
                              {
                                  user?.image_url === "" || user?.image_url === null ? (
                                      <img src={DefaultProfile} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                  ) : (
                                      <img src={user?.image_url} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                  )
                              }
                              <td>&emsp;{idx+1}</td>
                              <td>{user?.name}</td>
                              <td>{user?.user_specialization?.name}</td>
                              <td>{user?.username}</td>
                              <td><Button name="Unduh" className={classes.downloadBtn}/></td>
                              <td><Button name="Unduh" className={classes.downloadBtn}/></td>
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

export default DataReports