import React from 'react'
import "./register.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid Email').required('Email address is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async(values) => {
      try {
        const response = await fetch('http://localhost:8000/project1/register', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.status);
          navigate('/login');
          window.location.reload(true);
        } else {
          // If there's an error message in the response, show it; otherwise, show a generic error
          const errorMessage = data.message || 'Registration failed';
          alert(errorMessage);
        }
      } catch (error) {
        console.log('Error:', error);
        alert('An error occurred during registration');
      }
      console.log('Form data:', values);
    }
  })


  return (
    <> 
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ "zIndex": "10" }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ "color": 'hsl(218, 81%, 95%)' }}>
                The best offer <br />
                <span style={{ "color": "hsl(218, 81%, 75%)" }}>for your business</span>
              </h1>
              <p className="mb-4 opacity-70" style={{ "color": "hsl(218, 81%, 85%)" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              {/* <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div> */}

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={formik.handleSubmit} >
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                          <label className="form-label" htmlFor="form3Example1">First name</label>
                          {formik.touched.firstName && formik.errors.firstName && (
                            <div className="error">{formik.errors.firstName}</div>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                          <label className="form-label" htmlFor="form3Example2">Last name</label>
                          {formik.touched.lastName && formik.errors.lastName && (
                            <div className="error">{formik.errors.lastName}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">

                      <input
                       autoComplete="off" 
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      {formik.touched.email && formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                      )}</div>


                    <div className="form-outline mb-4">

                      <input
                       autoComplete="off" 
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                      )}</div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register;