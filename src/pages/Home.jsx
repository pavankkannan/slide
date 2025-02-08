import React, { useState } from 'react';
import './Home.css'

function NavBar() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <nav className="navBar">
            <button className='navTab'>
                <h1>Suggested</h1>
            </button>
            <button className='navTab'>
                <h1>Nearby</h1>
            </button>
            <button className='navTab'>
                <h1>Deals</h1>
            </button>
        </nav>
    );
  }

const Home = () => {
    return (
        <>
            <div>SLIDE</div>
            <NavBar/>
        </>
    )

  };

  export default Home;