import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import Pagination from '../../Components/Pagination/Pagination'
import Search from '../../Components/Search/Search'
import classes from "./Request.module.css";
import EditIcon from "../../Assets/Icons/edit_icon.svg"
import DefaultProfile from "../../Assets/Images/default-profile.jpg";
import Button from '../../Components/Button/Button'
import Footer from '../../Components/Footer/Footer'
import { BASE_URL, getToken } from '../../Configs/APIAuth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(7);
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/course-takens`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(config).then(res => {
      setLoading(false);
      setRequests(res.data.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    });
  }, [])

  // Get Current Participants
  if(type === ""){
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var currentRequests =  requests.slice(indexOfFirstParticipant, indexOfLastParticipant);
  } else {
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var filtered = requests.filter(request => request.request_type.toLowerCase() === type.toLowerCase())
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
                    <option value="7">7</option>
                    <option value="5">5</option>
                    <option value="3">3</option>
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
              {
                loading ? (
                  <div className={classes.spinnerContain}>
                    <CircularProgress style={{ width: "200px", height: "200px", color: "#FF6C00" }} />
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <td>Roll No.</td>
                        <td>Full Name</td>
                        <td>Specialist</td>
                        <td>Email</td>
                        <td>Request Type</td>
                        <td width="15%">Status</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentRequests.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center h5">
                              Data tidak ditemukan...
                            </td>
                          </tr>
                        ) : (
                          currentRequests.filter((request) => {
                            if(searchTerm === "") {
                              return request
                            } else if (request.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return request 
                            } return false
                          }).map((request, idx) => {
                            return(
                              <tr key={idx}>
                                <td>{idx+1}</td>
                                <td>
                                  {
                                    request.user.image_url === "" ? (
                                      <img src={DefaultProfile} alt="avatar" width="50px" style={{borderRadius: "50%", marginRight: "20px"}}/>
                                    ) : (
                                      <img src={request.user.image_url} alt="avatar" width="50px" style={{borderRadius: "50%", marginRight: "20px"}}/>
                                    ) 
                                  }
                                  {request.user.name}
                                </td>
                                <td>{request.user.user_specialization.name}</td>
                                <td>{request.user.username}</td>
                                {
                                  request.request_type === "COURSE" ? (
                                    <td className={classes.textOrange}>Course</td>
                                    ) : (
                                    <td className={classes.textOrange}>Training</td>
                                  )
                                }
                                <td>
                                  { request.status === "PENDING" && <Button className={classes.btnStatusPending} name="Pending"/> }
                                  { request.status === "ACCEPTED" && <Button className={classes.btnStatusAccepted} name="Accepted"/> }
                                  { request.status === "REJECTED" && <Button className={classes.btnStatusRejected} name={request.status}/> }
                                </td>
                                <td>
                                  {
                                    request.status === "PENDING" && (
                                      <Link to={`/request/${request.id}`}>
                                        <img src={EditIcon} alt="editIcon" width="30px" style={{cursor: "pointer"}}/>
                                      </Link>
                                    )
                                  }
                                </td>
                              </tr>
                            )
                          })
                        )
                      }
                    </tbody>
                  </table>
                )
              }
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