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
import Spot from './pages/Spot';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/ChooseLogin">ChooseLogin</Link>
          </li>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to ="/Spot">Spot</Link><Link/>
          </li>
          <li>
            <Link to ="/Profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ChooseLogin/>} />
        <Route path="/ChooseLogin" element={<ChooseLogin/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/StudentLogin" element={<StudentLogin/>} />
        <Route path="/BusinessLogin" element={<BusinessLogin/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Spot/:id" element={<Spot/>} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;