import React, { useState } from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import classes from "./ForgotPassword.module.css"

function ForgotPassword() {    
    const [email, setEmail] = useState("");

  return (
    <>
        <Navbar />
        <div className="container-fluid">
            <div className="row ">
                <div className={`col ${classes.rightpage}`}>
                    <div className={`d-flex flex-column align-items-center justify-content-center ${classes.layout}`}>
                        <div className="border rounded-3 shadow">
                            <div className="d-flex flex-column align-items-center m-5 p-3">
                                <h5 className={`${classes.headingtext}`}><a className={`nav-link ${classes.colorteks}`} href='/login'>Back to Login</a></h5>
                                <h1 className={`${classes.headingtext}`}>Forgot Password</h1>
                                <p className={`text-center mb-4 ${classes.smalltext}`}>Send a link to your email to reset your password</p>
                                <div className="d-flex flex-column">
                                    <label htmlFor="email" className={`form=label mb-2 ${classes.labeltext}`}>Your email</label>
                                    <div className="input-group mb-3">
                                        <input type="email" className={`${classes.forminput}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required/>
                                    </div>
                                </div>
                                <div className="d-flex flex-column mb-3 ">
                                    <button type="button" className={`btn ${classes.buttonreset}`}>
                                        Send Reset Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword