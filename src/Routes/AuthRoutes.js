import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from '../pages'

function AuthRoutes() {
  return (
    <Routes>
    <Route index path='/login' element={<LoginForm />} />
    {/* <Route index path='/login' element={<Login />} /> */}
    {/* <Route path='/Sign-Up' element={<Signup />} /> */}
    <Route path='*' element={<Navigate to='/login' />} />
  </Routes>
  )
}

export default AuthRoutes
