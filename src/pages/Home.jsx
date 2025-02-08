import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";



// const businesses = [
//     {
//         id: 1,
//         src: "living_water_tea_house.jpg",
//         name: "Living Water Tea House",
//         address: "1453 W Taylor St",
//     },
//     {
//         id: 2,
//       src: "coffee_corner.jpg",
//       name: "Coffee Corner",
//       address: "1234 Main St",
//     },
//     {
//         id: 3,
//       src: "green_garden_cafe.jpg",
//       name: "Green Garden Cafe",
//       address: "5678 Elm St",
//     },
//     {
//         id: 4,
//       src: "sunset_bistro.jpg",
//       name: "Sunset Bistro",
//       address: "9101 Oak St",
//     },
//     {
//         id: 5,
//       src: "urban_brew.jpg",
//       name: "Urban Brew",
//       address: "1122 Pine St",
//     },
// ];


function CentralNavBar() {
    const navigate = useNavigate();
    const handleClick = (route) => () => {
        navigate(`/${route}`);
    };

    return (
        <div className='CentralNavBar'>
            <div className='centralNavTab' onClick={handleClick("Home")}>
                <img src="/assets/home.png" style={{width: "20%"}}/>
                <h1>HOME</h1>
            </div>
            <div className='centralNavTab' onClick={handleClick("Gmap")}>
                <img src="/assets/map.png" style={{width: "20%"}}/>
                <h1>MAP</h1>
            </div>
            <div className='centralNavTab' onClick={handleClick("Profile")}>
                <img src="/assets/profile.png" style={{filter: "invert(90)", width: "30%", marginBottom: "-5px"}}/>
                <h1>PROFILE</h1>
            </div>
        </div>
    )
}

function HomeNavBar() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <nav className="HomeNavBar">
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

function BusinessCard({ businessImage, businessName, address, onClick }) {

    return (
        <div className='BusinessCard'
            onClick={onClick}
        >
            <img src={`/assets/${businessImage}`}/>
            <div className='cardText'>
                <h1>{businessName}</h1>
                <p>{address}</p>
            </div>
        </div>
    )
}

function BusinessCards() {

    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const querySnapshot = await getDocs(collection(db, "Businesses"));
            const businessList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBusinesses(businessList);
        };
        fetchBusinesses();
    }, []);


    const handleCardClick = (business) => {
        navigate(`/Spot/${business.id}`, { state: business });
        // navigate(`/Spot`);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
            {businesses.map((business, index) => (
                <BusinessCard
                    key={index}
                    businessImage={business.businessImage}
                    businessName={business.businessName}
                    address={business.address}
                    onClick={() => handleCardClick(business)}
                />
            ))}
        </div>
    );
}

const Home = () => {
    return (
        <div className='Home'>
            <CentralNavBar/>
            <HomeNavBar/>
            <BusinessCards/>
        </div>
    )

  };

  export default Home;