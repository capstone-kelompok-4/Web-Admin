import React, { useState } from 'react'
import classes from "./AddUser.module.css";
import Button from '../../../Components/Button/Button'
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/Navigation/Sidebar'
import Footer from '../../../Components/Footer/Footer';

function AddUser() {
  const initialUserState = {
    fullName: "",
    photoProfile: "",
    specialist: "",
    email: "",
    phoneNumber: "",
    detailAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  }

  const [user, setUser] = useState(initialUserState)

  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    
    if(name === "photoProfile"){
      setUser({
        ...user,
        [name]: files[0]
      })
    } else if (name === "") {
      
    } else {
      console.log(e.target.name," : ",e.target.value);
      setUser({
        ...user,
        [name]: value
      })
    }

    console.log(user);
  }

  const handlerCancel = (e) => {
    e.preventDefault();
    setUser(initialUserState);
    console.log(user);
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
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
                    placeholder='Your Name'
                    required
                    value={user.fullName} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className={`col-md-5 col-sm-12 col-lg-5 col-xl-5 ps-2 ${classes.thecontent}`}>
                  <label htmlFor="photoProfile">Photo Profile</label>
                  <input 
                    type="file" 
                    name="photoProfile" 
                    id="photoProfile"
                    onChange={handleInputChange} 
                    accept="image/png, image/jpg, image/gif, image/jpeg" 
                  />
                </div>
              </div>
              
              <label htmlFor="specialist">Specialist</label>
              <select value={user.specialist} name="specialist" id="specialist" onChange={handleInputChange} required>
                <option value="" selected hidden>Set Role</option>
                <option value="Designer">Designer</option>
                <option value="Engineer">Engineer</option>
                <option value="Management">Management</option>
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
                placeholder=''
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
                    type="text"
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
