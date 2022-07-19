import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../../Components/Button/Button'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import { BASE_URL, getToken } from '../../Configs/APIAuth'
import classes from "./EditRequest.module.css"

const EditRequest = () => {
  const { id } = useParams();
  const [courseTaken, setCourseTaken] = useState({})
  const [reqStatus, setReqStatus] = useState("");
  const navigate = useNavigate();

  const handleEditRequest = (e) => {
    e.preventDefault();
    const token = getToken();
    const data = {
      "status": reqStatus
    }

    var config = {
      method: 'put',
      url: `${BASE_URL}/course-takens/update-status/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then( async () => {
      await Swal.fire(
        "Success!",
        "Successfully Updated Request",
        'success',
      )
      navigate("/request")
    })
    .catch(err => {
      console.log(err);
    });

  }

  useEffect(() => {
    const token = getToken();
    var configGetCourseTakenById = {
      method: 'get',
      url: `${BASE_URL}/course-takens/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(configGetCourseTakenById)
    .then(res => {
      setCourseTaken(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
    
  }, [id])

  const handleStatusChange = (e) => {
    setReqStatus(e.target.value)
  }

  return (
    <>
      <Sidebar activeNow="Request"/>
      <div className={classes.container}>
        <Header data="Request" />
        <div className={classes.containerContent}>
          <h3>Detail Request</h3>
          <div className={classes.editRequest}>
            <h3 className={classes.titleForm}>Edit Request</h3>
            <h6 className={classes.description}>Accept or Reject users request </h6>
            <form onSubmit={handleEditRequest}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name='name' 
                id='name'
                value={courseTaken?.user?.name}
                readOnly
              />
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name='email' 
                id='email' 
                value={courseTaken.user?.username}
                readOnly
              />
              <label htmlFor="specialization">Specialist</label>
              <input 
                type="text" 
                name='specialization' 
                id='specialization' 
                value={courseTaken.user?.user_specialization.name}
                disabled
              />
              <label htmlFor="requestType">Request Type</label>
              <input 
                type="text" 
                name='requestType' 
                id='requestType' 
                value={courseTaken.request_type}
                readOnly
              />
              <label htmlFor="status">Status</label>
              <select name="status" id="status" value={reqStatus} onChange={handleStatusChange}>
                <option value="0">Pending</option>
                <option value="1">Accepted</option>
                <option value="2">Rejected</option>
              </select>

              <label htmlFor="requestTitle">Request Title</label>
              <input 
                type="text" 
                name='requestTitle' 
                id='requestTitle' 
                value={courseTaken.course_take?.name}
                readOnly
              />
              <label htmlFor="requestDetail">Request Detail</label>
              <textarea 
                name="requestDetail" 
                id="requestDetail" 
                rows="5" 
                value={courseTaken.request_detail} 
                readOnly
              ></textarea>
              <div className={classes.buttonWrapper}>
                <Button className={classes.btnSave} name="Save" />
              </div>
            </form> 
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRequest