import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import CenteredSpinner from "../../Components/Loading/CenteredSpinner";
import Navbar from "../../Components/Navigation/Navbar";
import { Alert } from "react-bootstrap";
import { BASE_URL, getToken, setAdminSession, setAdminTokenSession } from "../../Configs/APIAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      url: `${BASE_URL}/auth/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setError(null);
    setLoading(true);
    axios(config)
      .then((response) => {
        setLoading(false);
        setAdminTokenSession(response.data.data.token);
        
        const token = getToken();
        var config = {
          method: 'get',
          url: `${BASE_URL}/users`,
          headers: { 
            'Authorization':`Bearer ${token}`
          }
        };
        axios(config)
        .then(res => {
          if(res.data.data.roles[0].name === "ROLE_USER") {
            setError("Only Role Admin can Login")
          } else {
            setAdminSession(res.data.data)
            navigate("/");
          }
        })
        .catch(err => console.log(err.message))

      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message);
        } else if (error.response.status === 500) {
          setError("Email or Password Wrong");
        } else {
          setError("Something Went Wrong, Please Try Again Later");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className={`col ${classes.rightpage}`}>
            <div
              className={`d-flex flex-column align-items-center justify-content-center ${classes.layout}`}
            >
              <div className="border rounded-3 shadow">
                <div className="d-flex flex-column align-items-center m-5 p-3">
                  <h1 className={`mb-4 ${classes.headingtext}`}>LOGIN ADMIN</h1>
                  <div className="d-flex flex-column">
                    <label
                      htmlFor="email"
                      className={`form-label mb-2 ${classes.labeltext}`}
                    >
                      Your Email
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className={`form-control ${classes.forminput}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <label
                      htmlFor="password"
                      className={`form-label mb-2 ${classes.labeltext}`}
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className={`form-control ${classes.forminput}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-3 ">
                    <div
                      className="form-check"
                      style={{ paddingRight: "260px" }}
                    >
                      <input
                        className={`form-check-input ${classes.checkbox}`}
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className={`form-check-label ${classes.labeltext}`}
                        htmlFor="flexCheckDefault"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  {!loading && (
                    <div
                      className="d-flex flex-column"
                      style={{ width: "400px", fontFamily: "Poppins", textAlign: "center" }}
                    >
                      {error && <Alert variant="danger">{error}</Alert>}
                    </div>
                  )}
                  {loading && (
                    <div className="d-flex flex-column mb-3 ">
                      <CenteredSpinner />
                    </div>
                  )}
                  <div className="d-flex flex-column mb-3 ">
                    <button
                      type="button"
                      className={`btn ${classes.buttonreset}`}
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                  </div>
                  <p className={`${classes.smalltext}`}>
                    Forgotten your password?
                    <span>
                      <a
                        className={`nav-link ps-2 ${classes.colorteks} ${classes.smalltext}`}
                        href="/forgot_password"
                      >
                        Reset
                      </a>
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
