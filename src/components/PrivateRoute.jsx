import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../authentication'

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet/> : <Navigate to="/about"/>;
}

export default PrivateRoute
