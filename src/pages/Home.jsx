import React, { useState } from 'react';
import './Home.css'

function NavBar() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <nav className="NavBar">
            <button className='navTab'>
                className={activeTab === 'home' ? 'active' : ''}
                onClick={() => handleTabClick('home')}
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

function BusinessCard() {
    return (
        <div className='BusinessCard'>
            <img src="/assets/living_water_tea_house.jpg" alt='ty'/>
            <div className='cardText'>
                <h1>Living Water Tea House</h1>
                <p>1453 W Taylor St</p>
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <>
            <div>SLIDE</div>
            <NavBar/>
            <div className='cardRow'>
                <BusinessCard/>
                <BusinessCard/>
            </div>
        </>
    )

  };

  export default Home;