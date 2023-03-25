import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './user-routes/UserDashboard';
import ProfileInfo from './user-routes/ProfileInfo';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/about" Component={About}/>
        <Route path="/services" Component={Services}/>
        <Route path="/user" Component={PrivateRoute}>
          <Route path='dashboard' Component={UserDashboard}/>
          <Route path='profile-info' Component={ProfileInfo}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
