import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import Pagination from '../../Components/Pagination/Pagination'
import Search from '../../Components/Search/Search'
import { getAllRequest } from '../../Configs/MockAPI'
import classes from "./Request.module.css";
import ChevronRightIcon from "../../Assets/Icons/chevron_right.svg";
import Button from '../../Components/Button/Button'
import Footer from '../../Components/Footer/Footer'

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllRequest().then(res => setRequests(res.data)).catch(err => console.log(err))
  }, [requests])

  // Get Current Participants
  if(type === ""){
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var currentRequests =  requests.slice(indexOfFirstParticipant, indexOfLastParticipant);
  } else {
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var filtered = requests.filter(request => request.requestType.toLowerCase() === type.toLowerCase())
    currentRequests = filtered.slice(indexOfFirstParticipant, indexOfLastParticipant);
  }
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = (page) => setCurrentPage(page);
  const nextPage = (page) => setCurrentPage(page);
  const totalPage = Math.ceil(requests.length / dataPerPage);

  // Handle Show Entries
  const handleShowEntries = (e) => {
    setDataPerPage(e.target.value);
  }

  // Handle Filter Specialization
  const handleFilterType = (e) => {
    setType(e.target.value)
  }

  // Handle Search Bar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Sidebar activeNow="Request"/>    
      <div className={classes.container}>
        <Header data="Request"/>
        <div className={classes.containerContent}>
          <h3>Request</h3>
          <div className={classes.tableRequest}>
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
                <h5>Filter Type</h5>
                <select name="type" id="type" className={classes.dropdownBtn} value={type} onChange={handleFilterType}>
                  <option value="">Set Type</option>
                  <option value="course">Course</option>
                  <option value="training">Training</option>
                </select>
              </div>
            </div>
            <div className={classes.table}>
              <table>
                <thead>
                  <tr>
                    <td>Roll No.</td>
                    <td>Full Name</td>
                    <td>Specialist</td>
                    <td>Email</td>
                    <td>Request Type</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentRequests.filter((request) => {
                      if(searchTerm === "") {
                        return request
                      } else if (request.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return request 
                      } return false
                    }).map((request, idx) => {
                      return(
                        <tr key={idx}>
                          <td>{request.id}</td>
                          <td><img src={request.avatar} alt="avatar" width="50px" style={{borderRadius: "50%", marginRight: "20px"}}/>{request.fullName}</td>
                          <td>{request.specialist}</td>
                          <td>{request.email}</td>
                          <td>{request.requestType}</td>
                          <td>
                            { request.status === "Pending" && <Button className={classes.btnStatusPending} name={request.status}/> }
                            { request.status === "On Check" && <Button className={classes.btnStatusOnCheck} name={request.status}/> }
                            { request.status === "Accepted" && <Button className={classes.btnStatusAccepted} name={request.status}/> }
                          </td>
                          <td><img src={ChevronRightIcon} alt="chevronIcon" width="30px" style={{cursor: "pointer"}}/></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          {
            type === "" ? (
              <div className={classes.pagination}>
                <h6>Showing {currentPage} to {totalPage} of {requests.length} entries</h6>
                <Pagination dataPerPage={dataPerPage} totalData={requests.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
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

export default Request