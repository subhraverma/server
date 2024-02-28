import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/project1/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
    
        if (data && data.status === true && data.code === 200) {
          const token = data.data.token;
          window.localStorage.setItem("token", JSON.stringify(token));
          navigate('/viewblog');
        } else {
        alert(data && data.error ? data.error:'An error occurred');
        }
      } catch (error) {
       console.log(error);
       alert('An error occurred during registration');
      }
    },
    
  });

  return (
    <>
      <section className="h-100 gradient-form" style={{ "backgroundColor": " #eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ "width": "185px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>
                      <form onSubmit={formik.handleSubmit}>                          <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input
                           autoComplete="off"
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="form-control"
                            placeholder="Enter Your Email"
                          />
                          {formik.errors.email && formik.touched.email && (
                            <div className='error'>{formik.errors.email}</div>
                          )}

                          <label className="form-label" htmlFor="form2Example11">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                           autoComplete="off"
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="form-control"
                          />
                          {formik.errors.password && formik.touched.password && (
                            <div className='error'>{formik.errors.password}</div>
                          )}
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                        </div>
                        <div className="text-center pt-1 mb-5">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Log
                            in</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/register" className="btn btn-outline-danger">Register</Link>                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;