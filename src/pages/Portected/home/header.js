import React from 'react'
import './header.css'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/userSlice'
// import { auth } from '../../firebase';



function AdminHeader() {


const navigate = useNavigate();

const dispatch = useDispatch();

const handlelogOut = () => {
  localStorage.removeItem('user-token');
  // setUser(null);

  dispatch(logout())
  navigate('/login'); 

}

  return (
    <>
    <nav class="navbar navbar-expand-lg ">
  <div class="container">
    <a class="navbar-brand fs-1 text bold nav-logo" href="#">Heaven<spam className='navlogo-span'>.com</spam></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
      <ul class="navbar-nav  mb-2 mb-lg-0 gap-2 ">
        <li class="nav-item">
        <Button  onClick={() => navigate('/admincrud')}>admin </Button>
        </li>
        <li class="nav-item">
        <Button onClick={() => navigate('/Addpark')}>All Parks</Button>
        </li>
        <li class="nav-item">
        <Button  onClick={() => navigate('/Allbooking')}>Booking</Button>
        </li>
        <li class="nav-item">
        <Button onClick={() => navigate('/approval')}>Approval</Button>
        </li>
        <li class="nav-item">
        <Button  onClick={handlelogOut} className="profileScreen_signOut">Sign Out </Button>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
   
    </>

  )
}

export default AdminHeader
