import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/Alert/alertContext';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

const Login = () => {
 
  const alcontext = useContext(alertContext);
  const { showAlert } = alcontext;
  const [credentials, setcredentials] = useState({email:"",password:""});
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  const navigate = useNavigate();
  const onChange = (e)=>
  {
      setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  const handleClick = async (e)=>{
    e.preventDefault();
  //API Call to add a note

  try {
    const response = await axiosInstance.post(`auth/login`,credentials);
    showAlert('Successfully Logged In','success');
    localStorage.setItem('token',response.data.authToken);
    navigate("/");
  } catch (error) {
    showAlert(error,'danger');
  }
  }
  return (
     <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        objectFit:'cover'
      }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign in
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleClick}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i
                          className="fas fa-envelope fa-lg me-3 fa-fw"
                          style={{ marginBottom: "10%" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            value={credentials.email}
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email address
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i
                          className="fas fa-lock fa-lg me-3 fa-fw"
                          style={{ marginBottom: "10%" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            value={credentials.password}
                            name="password"
                            id="password"
                            onChange={onChange}
                            required
                            minLength={5}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="Submit"
                          className="btn btn-success"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                    <Link to="/signup" style={{ marginLeft: "90px" }}>
                      Don't have an Account? Create One
                    </Link>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="/images/logo1.jpeg"
                      className="img-fluid"
                      style={{ paddingLeft: "80px" }}
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
