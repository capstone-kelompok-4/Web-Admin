import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Navigation/Sidebar'
import Pagination from '../../Components/Pagination/Pagination';
import Search from '../../Components/Search/Search';
import { getAllUsers } from '../../Configs/MockAPI';
import classes from "./DataReports.module.css";

const DataReports = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [specialist, setSpecialist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data)).catch(err => console.log(err))
  }, [users])

  // Get Current Participants
  if(specialist === ""){
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var currentUsers =  users.slice(indexOfFirstParticipant, indexOfLastParticipant);
  } else {
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var filtered = users.filter(user => user.specialist.toLowerCase() === specialist.toLowerCase())
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
                          <td><img src={user.avatar} alt="avatar" width="50px" style={{borderRadius: "50%"}}/></td>
                          <td>{user.id}</td>
                          <td>{user.fullName}</td>
                          <td>{user.specialist}</td>
                          <td>{user.email}</td>
                          <td><Button name="Unduh" className={classes.downloadBtn}/></td>
                          <td><Button name="Unduh" className={classes.downloadBtn}/></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
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