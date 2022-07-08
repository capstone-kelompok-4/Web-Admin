import React, { useState } from 'react'
// import { Alert } from 'react-bootstrap';
// import CenteredSpinner from '../../Components/Loading/CenteredSpinner';
import Navbar from '../../Components/Navigation/Navbar';
import classes from "./ForgotPassword.module.css"

function ForgotPassword() {    
    // const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("") 
    // const [error, setError] = useState("");
    // const [message, setMessage] = useState("");
    const resetPasswordHandler = () => {
        
    }
    
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
                                        <input type="email" className={`form-control ${classes.forminput}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required/>
                                    </div>
                                </div>
                                {/* {loading && 
                                <div className="d-flex flex-column mb-3 ">
                                    <CenteredSpinner />
                                </div>
                                }
                                {!loading && 
                                    <div className="d-flex flex-column" style={{width: "400px"}}>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        {message && <Alert variant="success">{message}</Alert>}
                                    </div>
                                } */}
                                <div className="d-flex flex-column mb-3 ">
                                    <button type="button" className={`btn ${classes.buttonreset}`} onClick={resetPasswordHandler}>
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