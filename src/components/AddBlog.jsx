import React from 'react';
import './login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
function AddBlog() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact: '',
      img: null,
      location: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contact: Yup.string().required('Contact is required'),
      img: Yup.mixed().required('Profile Image is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: (values) => {
      console.log("values",values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("img", values.img);
      formData.append("location", values.location);
    
      console.log("formadata", formData);
    
      const token = JSON.parse(window.localStorage.getItem("token"));
      fetch(`http://localhost:8000/project1/blog`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })
        .then((res) => {
          console.log("response==",res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          navigate('/viewblog');
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('Blog data:', values);
    },
  });

  return (
    <>
      <section style={{ "backgroundColor": " #eee" }}>
        <div className="container py-5">
          <div className='p-5'>
            <h1 className="mb-4">Add Blog</h1>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                className="form-control m-4"
                placeholder='Enter Your Name'
              />
              {formik.touched.name && formik.errors.name && (
                <span className="error">{formik.errors.name}</span>
              )}
              <input
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className="form-control m-4"
                placeholder='Enter Your Email'
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error">{formik.errors.email}</span>
              )}

              <input
                type="text"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="contact"
                className="form-control m-4"
                placeholder='Enter Your Mobile'
              />
              {formik.touched.contact && formik.errors.contact && (
                <span className="error">{formik.errors.contact}</span>
              )}

              <input
                type="file"
                onChange={(e) => formik.setFieldValue('img', e.target.files[0])}
                onBlur={formik.handleBlur}
                name="img"
                className="form-control m-4"
                placeholder='Enter Your profile'
              />
              {formik.touched.img && formik.errors.img && (
                <span className="error">{formik.errors.img}</span>
              )}

              <input
                type="text"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="location"
                className="form-control m-4"
                placeholder='Enter Your location'
              />
              {formik.touched.location && formik.errors.location && (
                <span className="error">{formik.errors.location}</span>
              )}
              <button type="submit" style={{background:'#2d0f1f'}}
              className='form-control btn btn-success m-4' value="Submit">Add</button>
            </form>
          </div>
        </div>
      </section>
    </>

  );
}

export default AddBlog;
