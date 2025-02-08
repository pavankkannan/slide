import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'

const businesses = [
    {
        id: 1,
        src: "living_water_tea_house.jpg",
        name: "Living Water Tea House",
        address: "1453 W Taylor St",
    },
    {
        id: 2,
      src: "coffee_corner.jpg",
      name: "Coffee Corner",
      address: "1234 Main St",
    },
    {
        id: 3,
      src: "green_garden_cafe.jpg",
      name: "Green Garden Cafe",
      address: "5678 Elm St",
    },
    {
        id: 4,
      src: "sunset_bistro.jpg",
      name: "Sunset Bistro",
      address: "9101 Oak St",
    },
    {
        id: 5,
      src: "urban_brew.jpg",
      name: "Urban Brew",
      address: "1122 Pine St",
    },
];

function NavBar() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <nav className="NavBar">
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

function BusinessCard({src, name, address, onClick}) {

    return (
        <div className='BusinessCard'
            onClick={onClick}
        >
            <img src={`/assets/${src}`}/>
            <div className='cardText'>
                <h1>{name}</h1>
                <p>{address}</p>
            </div>
        </div>
    )
}

function BusinessCards() {

    const navigate = useNavigate();

    const handleCardClick = (business) => {
        navigate(`/Spot/${business.id}`, { state: business });
        // navigate(`/Spot`);
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {businesses.map((business, index) => (
            <BusinessCard
                key={index}
                src={business.src}
                name={business.name}
                address={business.address}
                onClick={() => handleCardClick(business)}
            />
            ))}
        </div>
    )
}

const Home = () => {
    return (
        <>
            <div>SLIDE</div>
            <NavBar/>
            <BusinessCards/>
        </>
    )

  };

  export default Home;