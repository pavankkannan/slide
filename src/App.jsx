import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register';
import ChooseLogin from './pages/ChooseLogin';
import Profile from './pages/Profile';
import './App.css'
import StudentLogin from './pages/StudentLogin'
import BusinessLogin from './pages/BusinessLogin'
import BusinessDashboard from './pages/BusinessDashboard'
import Spot from './pages/Spot';
import Promotions from './pages/Promotions';
import { AuthProvider } from './config/AuthContext';
import Gmap from './pages/Gmap'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/ChooseLogin">ChooseLogin</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to ="/Gmap">GMAP</Link>
            </li>
            <li>
              <Link to ="/Profile">Profile</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<ChooseLogin/>} />
          <Route path="/ChooseLogin" element={<ChooseLogin/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/StudentLogin" element={<StudentLogin/>} />
          <Route path="/BusinessLogin" element={<BusinessLogin/>} />
          <Route path="/BusinessDashboard" element={<BusinessDashboard />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Spot/:id" element={<Spot/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Gmap" element={<Gmap/>} />
        <Route path="/Promotions" element={<Promotions/>} />

        </Routes>
      </Router>
    </AuthProvider >
  );
};

export default App;