import React, { useState, useEffect } from 'react';
function VeiwBlog() {
  let token = JSON.parse(window.localStorage.getItem('token'))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [img, setImg] = useState('')
  const [location, setLocation] = useState('')
  const [data, setData] = useState([]);
  function viewBlog() {
    fetch(' http://localhost:8000/project1/blog', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log(result);
        result.json().then((res) => {
          setData(res);
        })
      })

  }
  useEffect(() => {
    viewBlog()
  },[]);

  function Delete(id) {
    console.log(id);
      fetch(`http://localhost:8000/project1/blog/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => res.json()) 
        .then((res) => {
          console.log(res);
          alert('Delete Record')
          viewBlog();
        })
        .catch((err)=>{
          console.log(err);
          alert("Failed to delete record");
        })
  }
  

  function edit(id) {
    window.localStorage.setItem('stt', JSON.stringify(id._id))
    setName(id.name)
    setEmail(id.email)
    setImg(id.img)
    setContact(id.contact)
    setLocation(id.location)
  }

  function handleupdate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("img", img);
    formData.append("location", location);
    let id = JSON.parse(window.localStorage.getItem("stt"));
    console.log(id);
    fetch(`http://localhost:8000/project1/blog/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert("Content Updated Successfully");
        viewBlog()
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (

    <div className="container ">
      <table className="table">
        <thead className="thead-dark">
          <tr style={{ background: '#302b63' }}>
            <th>Id</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>NUMBER</th>
            <th>IMAGE</th>
            <th>LOCATION</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td><img src={`http://localhost:8000/project1/img/${item.img}`} height='30px' width="40px" alt='path not found' /></td>
              <td>{item.location}</td>
              <td>
                <button type="button" onClick={() => edit(item)} className="btn" style={{background:'#2f0f38',color:"whitesmoke"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Edit
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleupdate}>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control w-100 ' placeholder='Enter Your Name' /><br />
                          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control w-100 ' placeholder='Enter Your Email' /><br />
                          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className='form-control w-100 ' placeholder='Enter Your Mobile' /><br />
                          <input type="file" onChange={(e) => setImg(e.target.files[0])} className='form-control w-100 ' placeholder='Enter Your profile' /><br />
                          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='form-control w-100 ' placeholder='Enter Your location' /><br />
                          <input type="submit" className='form-control' value="UPDATE" style={{background:'#2d0f1f',color:"white"}} /><br />

                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{background:'#9d211e',color:"white"}}   data-bs-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
                

              </td>
              <td><button onClick={() => Delete(item._id)} className='btn ' style={{background:'#68101d',color:"whitesmoke"}} >Delete</button></td>

            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}

export default VeiwBlog;

