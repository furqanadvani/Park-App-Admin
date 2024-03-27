import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { AdminHome, CreateAdminForm } from '../pages'
import AdminPanel from '../pages/Portected/home/Userlist'
import AddParkPage from '../pages/Portected/home/AddParkForm'
import UpdateUserForm from '../pages/Portected/home/updateUserForm'
import CreateUser from '../pages/Portected/home/create-user'
import AdminCrud from '../pages/Portected/home/admincrud'
import UpdateAdmin from '../pages/Portected/home/udateAdmin'
import AllparkList from '../pages/Portected/home/Allpark'
import ParkView from '../pages/Portected/home/parkview'
import UpdateParkForm from '../pages/Portected/home/Updatepark'
import GetAllBookings from '../pages/Portected/home/Booking/GetBooking'
import AllApproval from '../pages/Portected/home/Approval/approval'
// import UpdateParkform from '../pages/Portected/home/UpdateParkform'

function ProtectedRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/home' element={< AdminHome/>} />
      <Route path='/userlist' element={< AdminPanel/>} />
      <Route path='/AddparkForm' element={< AddParkPage/>} />
      <Route path='/Addpark' element={<AllparkList/>} />
      <Route path='updateUser/:id' element={<UpdateUserForm />} />
      <Route path='/createUser' element={<CreateUser />}/>
      <Route path='/admincrud' element={<AdminCrud />}/>
      <Route path='/createadminform' element={<CreateAdminForm />}/>
      <Route path='/updateAdminfrom/:id' element={<UpdateAdmin />} />
      <Route path="/detail/:cardId" element={<ParkView />} />
      <Route path="/updatePark/:cardId" element={<UpdateParkForm />} />
      <Route path="/Allbooking" element={<GetAllBookings />} />
      <Route path='/approval' element={<AllApproval />} />
    </Routes>
    </div>
  )
}


function UpdateUserPage() {
  const { id } = useParams(); // Extract the user ID from the route parameters
  return <UpdateUserForm userId={id} />; // Pass the user ID to the UpdateUserForm component
}
export default ProtectedRoutes
