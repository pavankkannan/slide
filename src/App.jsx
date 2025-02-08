import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ChooseLogin from './pages/ChooseLogin';
import Profile from './pages/Profile';
import './App.css'
import Spot from './pages/Spot';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Spot">Spot</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChooseLogin" element={<ChooseLogin />} />
        <Route path="/Spot" element={<Spot/>} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;