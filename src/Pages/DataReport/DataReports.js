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
import classes from "./DataReports.module.css";
import DefaultProfile from "../../Assets/Images/default-profile.jpg";

const DataReports = () => {
  const [allCourseTaken, setAllCourseTaken] = useState([]);
  console.log(allCourseTaken);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [specialist, setSpecialist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handlerDownloadDataReport = (id) => {
    const token = getToken();
    var configGetDataReport = {
      method: 'get',
      url: `${BASE_URL}/course-takens/download-reports/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetDataReport).then((res) => console.log(res)).catch((err) => console.log(err));
  }
  useEffect(() => {
    getAllCourseTaken();
  }, [])

  const handlerDownloadCertificate = (id) => {
    const token = getToken();
    var configGetCertificate = {
      method: 'get',
      url: `${BASE_URL}/course-takens/download-certificates/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetCertificate).then((res) => console.log(res)).catch((err) => console.log(err));
  }
  const sortedAllCourseTaken = allCourseTaken.sort(function(a, b) { 
    return a.id - b.id
  });

  const getAllCourseTaken = () => {
    setLoading(true);
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/course-takens`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(res => {
      setLoading(false);
      setAllCourseTaken(res.data.data);
    })
    .catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  // Get Current Participants
  if(specialist === ""){
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var currentCourseTaken =  sortedAllCourseTaken.slice(indexOfFirstParticipant, indexOfLastParticipant);
  } else {
    const indexOfLastParticipant = currentPage * dataPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - dataPerPage;
    var filtered = sortedAllCourseTaken.filter(courseTake => courseTake.user.user_specialization.name.toLowerCase() === specialist.toLowerCase())
    currentCourseTaken = filtered.slice(indexOfFirstParticipant, indexOfLastParticipant);
  }
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = (page) => setCurrentPage(page);
  const nextPage = (page) => setCurrentPage(page);
  const totalPage = Math.ceil(allCourseTaken.length / dataPerPage);

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
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                entries</h5>
                <Search placeholder="Cari User" className={classes.searchBar} onChange={handleSearch}/>
              </div>
              <div className={classes.bottom}>
                <h5>Filter Specialization</h5>
                <select name="role" id="role" className={classes.dropdownBtn} value={specialist} onChange={handleFilterSpecialist}>
                  <option value="">Set Role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Quality Engineer">Quality Engineer</option>
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
                        <td>Course Name</td>
                        <td>Specialist</td>
                        <td>Reports</td>
                        <td>Certificates</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentCourseTaken.filter((courseTaken) => {
                          if(searchTerm === "") {
                            return courseTaken
                          } else if (courseTaken.user?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return courseTaken 
                          } return false
                        }).map((courseTaken, idx) => {
                          return(
                            <tr key={idx}>
                              {
                                  courseTaken.user?.image_url === "" || courseTaken.user?.image_url === null ? (
                                      <img src={DefaultProfile} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                  ) : (
                                      <img src={courseTaken.user?.image_url} alt="photoProfile" width="50px" style={{borderRadius: "50%"}} />
                                  )
                              }
                              <td>&emsp;{courseTaken.id}</td>
                              <td>{courseTaken.user?.name}</td>
                              <td>{courseTaken.course_take?.name}</td>
                              <td>{courseTaken.user?.user_specialization?.name}</td>
                              <td><Button name="Unduh" className={classes.downloadBtn} onClick={() => handlerDownloadDataReport(courseTaken.id)}/></td>
                              <td><Button name="Unduh" className={classes.downloadBtn} onClick={() => handlerDownloadCertificate(courseTaken.id)}/></td>
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
                <h6>Showing {currentPage} to {totalPage} of {allCourseTaken.length} entries</h6>
                <Pagination dataPerPage={dataPerPage} totalData={allCourseTaken.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
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