import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/addblog' element={<AddBlog/>}></Route>
      <Route path='/viewblog' element={<ViewBlog/>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;