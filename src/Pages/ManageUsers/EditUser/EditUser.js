import React, { useEffect, useRef, useState } from 'react'
import classes from "./EditUser.module.css";
import Button from '../../../Components/Button/Button'
import Footer from '../../../Components/Footer/Footer'
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/Navigation/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
// import { getUserByID } from '../../../Configs/MockAPI';
import axios from 'axios';
import { BASE_URL, getToken } from '../../../Configs/APIAuth';
import Swal from 'sweetalert2';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../Firebase/Firebase';

function EditUser() {
  const imageRef = useRef();
  const { user_id } = useParams();
  console.log("params:",user_id);
  const [user, setUser] = useState({});
  console.log(user);
  const [selectedFile, setSelectedFile] = useState('');
  const [url, setUrl] = useState("");
  const [allSpecialization, setAllSpecialization] = useState([]);
  console.log(user.user_specialization);

  const navigate = useNavigate();

  // useEffect(() => {
  //   getUserByID(user_id).then(res => setUser(res.data)).catch(err => console.error(err.message));
  // }, [user_id])

  useEffect(() => {
    const token = getToken();
    var config = {
      method: 'get',
      url: `${BASE_URL}/users/${user_id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(config).then(res => {
      setUser(res.data.data);
      setUrl(res.data.data.image_url)
    }).catch(err => console.log(err));

    var configGetAllSpecializations = {
      method: 'get',
      url: `${BASE_URL}/specializations`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    axios(configGetAllSpecializations).then(res => setAllSpecialization(res.data.data)).catch(err => console.log(err));

  }, [user_id])

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    console.log(e.target.name," : ",e.target.value);
    if (e.target.name ===  "detail_address" || e.target.name ===  "country" ||
        e.target.name ===  "zip_code" || e.target.name ===  "city" ||
        e.target.name ===  "state_province"){
      setUser({
        ...user,
        address : {
          ...user.address,
          [name] : value
        }
      })
    }else {
      setUser({
        ...user,
        [name]: value
      })
      console.log(user);
    }
  }

  // handleSpecializationChange
  const handleSpecializationChange = (e) => {
    setUser({
      ...user,
      user_specialization: e.target.value
    })
  }

  // Upload image handler
  const uploadImageHandler = (e) => {
    const files = imageRef.current.files;
    const file = files[0];
    setSelectedFile(file.name);
    const fileRef = ref(storage, `user-profile/${file.name}`);
    setSelectedFile(file.name);
    uploadBytes(fileRef, file)
      .then(() => {
        getDownloadURL(fileRef).then((url) => {
          setUrl(url);
        });
      });
    imageRef.current.files = e.target.files;
    e.target.files = files;
  }

  const handlerCancel = (e) => {
    e.preventDefault();
    console.log(user);
    setSelectedFile("");
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    var data = JSON.stringify({
      "name": user.name,
      "email": user.username,
      "phone_number": user.phone_number,
      "image_url": url,
      "specialization_id": user.user_specialization,
      "address": {
        "detail_address": user.address.detail_address,
        "country": user.address.country,
        "state_province": user.address.state_province,
        "city": user.address.city,
        "zip_code": user.address.zip_code
      }
    })

    const token = getToken();

    var configEditUser = {
      method: 'put',
      url: `${BASE_URL}/users/edit-admin`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(configEditUser)
    .then(async res => {
      await Swal.fire(
        'Success!',
        'Successfully Update User!',
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
          <h2 className={classes.title}>Edit User</h2>
          <div className={classes.containerForm}>
            <h3 className={classes.titleForm}>Personal Information</h3>
            <h6 className={classes.description}>Change or update user personal profile with valid information </h6>
            <form onSubmit={handlerSubmit}>
              <div className={classes.twocontent}>
                <div className={`col-md-7 col-sm-12 col-lg-7 col-xl-7 pe-2 ${classes.thecontent}`}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text"
                    id='name' 
                    name='name' 
                    placeholder='Your Name'
                    required
                    value={user.name} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className={`col-md-5 col-sm-12 col-lg-5 col-xl-5 ps-2 ${classes.thecontent}`}>
                  <label htmlFor="image_url">Photo Profile</label>
                  <label
                    htmlFor="image_url"
                    style={{ padding: "10px 25px", margin: "20px 0", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#E7E7E7", display: "inline-block", cursor: "pointer", color: "#0D2341", opacity: ".9"}}
                  > Choose File
                    <input 
                      ref={imageRef}
                      type="file" 
                      name="image_url" 
                      id="image_url"
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
              <select value={user.user_specialization?.id} name="specialization" id="specialization" onChange={handleSpecializationChange} required>
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
                disabled
                value={user.username} 
                onChange={handleInputChange}
              />
              
              <label htmlFor="phone_number">Phone Number</label>
              <input 
                type="tel"
                id='phone_number' 
                name='phone_number' 
                placeholder='08xxxxxxxxxx'
                required
                value={user.phone_number} 
                onChange={handleInputChange}
              />

              <label htmlFor="detail_address">Detail Address</label>
              <input 
                type="text"
                id='detail_address' 
                name='detail_address' 
                placeholder='Detail Address'
                required
                value={user?.address?.detail_address} 
                onChange={handleInputChange}
              />

              <label htmlFor="country">Country</label>
              <input 
                type="text"
                id='country' 
                name='country' 
                placeholder='Country'
                required
                value={user?.address?.country} 
                onChange={handleInputChange}
              />

              <label htmlFor="state_province">State/Province</label>
              <input 
                type="text"
                id='state_province' 
                name='state_province' 
                placeholder='State / Province'
                required
                value={user?.address?.state_province} 
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
                    value={user?.address?.city} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className={`col-md-6 col-sm-12 col-lg-6 col-xl-6 ps-2 ${classes.thecontent}`}> 
                  <label htmlFor="zip_code">Zip Code</label>
                  <input 
                    type="text"
                    id='zip_code' 
                    name='zip_code' 
                    placeholder='xxxxx'
                    required
                    value={user?.address?.zip_code} 
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

export default EditUser