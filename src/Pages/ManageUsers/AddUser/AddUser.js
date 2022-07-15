import React, { useEffect, useRef, useState } from 'react'
import classes from "./AddUser.module.css";
import Button from '../../../Components/Button/Button'
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/Navigation/Sidebar'
import Footer from '../../../Components/Footer/Footer';
import { BASE_URL, getToken } from '../../../Configs/APIAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  useEffect(() => {
    const token = getToken();
    var configGetAllSpecializations = {
      method: 'get',
      url: `${BASE_URL}/specializations`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(configGetAllSpecializations).then(res => setAllSpecialization(res.data.data)).catch(err => console.log(err));

  }, [])

  const initialUserState = {
    fullName: "",
    photoProfile: "",
    email: "",
    password: "",
    phoneNumber: "",
    detailAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  }

  const [user, setUser] = useState(initialUserState);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [specialization, setSpecialization] = useState("");
  console.log(specialization);
  const [url, setUrl] = useState("");
  console.log(url);
  const imageRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    console.log(e.target.name," : ",e.target.value);
    setUser({
      ...user,
      [name]: value
    })    
    console.log(user);
  }
  
  // handleSpecializationChange
  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value)
  }

  const uploadImageHandler = (e) => {
    const files = imageRef.current.files;
    const file = files[0];
    const fileRef = ref(storage, `user-profile/${file.name}`);
    setSelectedFile(file.name);
    uploadBytes(fileRef, file)
      .then(() => {
        getDownloadURL(fileRef).then((url) => {
          setUrl(url);
        });
        setUser({
          ...user, 
          photoProfile: url
        })
      });
    imageRef.current.files = e.target.files;
    e.target.files = files;
  }

  const handlerCancel = (e) => {
    e.preventDefault();
    setUser(initialUserState);
    console.log(user);
    setSelectedFile("");
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    var data = JSON.stringify({
      "name": user.fullName,
      "image_url": url,
      "specialization_id": specialization,
      "email": user.email,
      "password": user.password,
      "phone_number": user.phoneNumber,
      "address": {
        "detail_address": user.detailAddress,
        "country": user.country,
        "state_province": user.state,
        "city": user.city,
        "zip_code": user.zipCode
      }
    })

    const token = getToken();
    var configAddUser = {
      method: 'post',
      url: `${BASE_URL}/auth/signup`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(configAddUser)
    .then( async res => {
      await Swal.fire(
        'Success!',
        'Successfully Added User!',
        'success'
      )
      await navigate("/manage_users");
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <Sidebar activeNow="Manage Users"/>
      <div className={classes.container}>
        <Header data="Manage Users"/>
        <div className={classes.containerContent}>
          <h2 className={classes.title}>Add User</h2>
          <div className={classes.containerForm}>
            <h3 className={classes.titleForm}>Personal Information</h3>
            <h6 className={classes.description}>Input user personal profile with valid information </h6>
            <form onSubmit={handlerSubmit}>
              <div className={classes.twocontent}>
                <div className={`col-md-7 col-sm-12 col-lg-7 col-xl-7 pe-2 ${classes.thecontent}`}>
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text"
                    id='fullName' 
                    name='fullName' 
                    placeholder='User full name'
                    required
                    value={user.fullName} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className={`col-md-5 col-sm-12 col-lg-5 col-xl-5 ps-2 ${classes.thecontent}`}>
                  <label htmlFor="photoProfile">Photo Profile</label>
                  <label
                    htmlFor="photoProfile"
                    style={{ padding: "10px 25px", margin: "20px 0", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#E7E7E7", display: "inline-block", cursor: "pointer", color: "#0D2341", opacity: ".9"}}
                  > Choose File
                    <input 
                      ref={imageRef}
                      type="file" 
                      name="photoProfile" 
                      id="photoProfile"
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      style={{display: "none"}}
                      onChange={uploadImageHandler} 
                    />
                  </label>
                  <span style={{color: "#0D2341", fontSize: "16px", fontFamily: "Poppins", marginLeft: "10px", opacity: ".8"}}>
                    {selectedFile ? selectedFile : "No Chosen File"}
                  </span>
                </div>
              </div>
              
              <label htmlFor="specialization">Specialization</label>
              <select value={specialization} name="specialization" id="specialization" onChange={handleSpecializationChange} required>
                <option value="" hidden>Set Specialization</option>
                {allSpecialization.map(specialization => {
                  return(
                    <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                  )
                })}
              </select>

              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id='email' 
                name='email' 
                placeholder='dave@corporate.com'
                required
                value={user.email} 
                onChange={handleInputChange}
              />
              
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id='password' 
                name='password' 
                placeholder='enter user password at least 8 character'
                required
                value={user.password} 
                onChange={handleInputChange}
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel"
                id='phoneNumber' 
                name='phoneNumber' 
                placeholder='08xxxxxxxxxx'
                required
                value={user.phoneNumber} 
                onChange={handleInputChange}
              />

              <label htmlFor="detailAddress">Detail Address</label>
              <input 
                type="text"
                id='detailAddress' 
                name='detailAddress' 
                placeholder='Detail Address'
                required
                value={user.detailAddress} 
                onChange={handleInputChange}
              />

              <label htmlFor="country">Country</label>
              <input 
                type="text"
                id='country' 
                name='country' 
                placeholder='Country'
                required
                value={user.country} 
                onChange={handleInputChange}
              />

              <label htmlFor="state">State/Province</label>
              <input 
                type="text"
                id='state' 
                name='state' 
                placeholder='State / Province'
                required
                value={user.state} 
                onChange={handleInputChange}
              />

              <div className={classes.twocontent}>
                <div className={`col-md-6 col-sm-12 col-lg-6 col-xl-6 pe-2 ${classes.thecontent}`}>
                  <label htmlFor="city">City</label>
                  <input 
                    type="text"
                    id='city' 
                    name='city' 
                    placeholder='City'
                    required
                    value={user.city} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className={`col-md-6 col-sm-12 col-lg-6 col-xl-6 ps-2 ${classes.thecontent}`}> 
                  <label htmlFor="zipCode">zipCode</label>
                  <input 
                    type="number"
                    id='zipCode' 
                    name='zipCode' 
                    placeholder='xxxxx'
                    required
                    value={user.zipCode} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={classes.buttonWrapper}>
                <Button className={classes.btnCancel} name="Cancel" onClick={handlerCancel} />
                <Button className={classes.btnSave} name="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddUser
