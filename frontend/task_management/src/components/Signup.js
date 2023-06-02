import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/Alert/alertContext';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

const Signup = () => {

    const alcontext = useContext(alertContext);
    const { showAlert } = alcontext;
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
    const navigate = useNavigate();
    const onChange = (e)=>
    {
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword} = credentials;
        if(password !== cpassword)
        {
            showAlert('Password does matches. Try Again','danger');
        }
        else
        {
        try {      
          console.log(axiosInstance);
          const response = await axiosInstance.post(`auth/register`, {name,email,password});
          showAlert('Account Created Sucessfully','success');
          console.log(response.data);
          localStorage.setItem('token',response.data.authToken);
          navigate("/");
        } catch (error) {
          showAlert(error,'danger');
        }
        }
    }
  return (
//     <div className='container my-5'>
//       <form onSubmit={handleClick}>
//       <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name</label>
//     <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required/>
//   </div>        
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="cpassword" className="form-label">Confirm Password</label>
//     <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
//   </div>
//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>
//     </div>

    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
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
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleClick}>
                      <div className="d-flex flex-row align-items-center mb-4 input">
                        <i
                          className="fas fa-user fa-lg me-3 fa-fw"
                          style={{ marginBottom: "10%" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            onChange={onChange}
                            required
                            minLength={3}
                          />
                          <label className="form-label" htmlFor="name">
                            Your Username
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i
                          className="fas fa-envelope fa-lg me-3 fa-fw"
                          style={{ marginBottom: "10%" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            onChange={onChange}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Your Email{" "}
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
                            name="password"
                            className="form-control"
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
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i
                          className="fas fa-key fa-lg me-3 fa-fw"
                          style={{ marginBottom: "10%" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            name="cpassword"
                            className="form-control"
                            id="cpassword"
                            onChange={onChange}
                            required
                            minLength={5}
                          />
                          <label htmlFor="cpassword" className="form-label">
                            Confirm Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="Submit"
                          className="btn btn-success"
                        >
                          {" "}
                          Register{" "}
                        </button>
                      </div>
                    </form>
                    <Link to="/login" style={{ marginLeft: "90px" }}>
                      Already have an Account? Login!
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

export default Signup;
