import React from 'react'
import './header.css'
import { Container } from 'react-bootstrap'
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
    
    <div className='Header-admin'>
    <Container>
        <div className='header-main-admin'>

        <div className='Admin-logo'>
            <h1 className='m-0 p-0' onClick={() => navigate('/home')}>Heaven<span>.com</span></h1>
        </div>
        {/* <div className='Admin-info'>
            <h1 className='p-0 m-0'>Admin !</h1>
        </div> */}
        <div className='admin-add'>
            <button onClick={() => navigate('/admincrud')}>admin</button>
            <button onClick={() => navigate('/Addpark')}>Parks</button>
            <button onClick={() => navigate('/Allbooking')}>Booking</button>
            <button onClick={() => navigate('/approval')}>Approval</button>
            <button
                                  onClick={handlelogOut}
                                  className="profileScreen_signOut">Sign Out</button>
        </div>
        </div>

    </Container>
    </div>
    </>

  )
}

export default AdminHeader
