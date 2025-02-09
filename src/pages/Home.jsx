import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../config/firebase";

function CentralNavBar() {
    const navigate = useNavigate();
    const handleClick = (route) => () => {
        navigate(`/${route}`);
    };

    return (
        <div className='central-nav-bar'>
            <div className='central-nav-tab' onClick={handleClick("Home")}>
                <img src="/assets/home.png" alt="Home" />
                <h1>HOME</h1>
            </div>
            <div className='central-nav-tab' onClick={handleClick("Gmap")}>
                <img src="/assets/map.png" alt="Map" />
                <h1>MAP</h1>
            </div>
            <div className='central-nav-tab' onClick={handleClick("Profile")}>
                <img src="/assets/profile.png" alt="Profile" />
                <h1>PROFILE</h1>
            </div>
        </div>
    );
}

function HomeNavBar() {
    return (
        <nav className="home-nav-bar">
            <button className='nav-tab'>Suggested</button>
            <button className='nav-tab'>Nearby</button>
            <button className='nav-tab'>Deals</button>
        </nav>
    );
}

function BusinessCard({ business, onClick }) {
    return (
        <div className='business-card' onClick={onClick}>
            <img src={business.businessPicture} alt={business.businessName} className='business-image' />
            <div className='card-text'>
                <h2>{business.businessName}</h2>
                <p>{business.address}</p>
            </div>
        </div>
    );
}

function BusinessCards() {
    const [businesses, setBusinesses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Businesses"));
                const businessList = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const businessData = doc.data();
                    let imageUrl = "/assets/default.png"; // Default image

                    if (businessData.businessPicture) {
                        try {
                            const imageRef = ref(storage, businessData.businessPicture); // Use stored path
                            imageUrl = await getDownloadURL(imageRef);
                            console.log("Success: ", imageUrl);
                        } catch (error) {
                            console.error(`Error loading image for ${businessData.businessName}:`, error);
                        }
                    }
                    return { id: doc.id, ...businessData, businessPicture: imageUrl };
                }));
                setBusinesses(businessList);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };
        fetchBusinesses();
    }, []);

    const handleCardClick = (business) => {
        navigate(`/Spot/${business.id}`, { state: business });
    };

    return (
        <div className='business-cards-container'>
            {businesses.map((business, index) => (
                <BusinessCard
                    key={index}
                    business={business}
                    onClick={() => handleCardClick(business)}
                />
            ))}
        </div>
    );
}

const Home = () => {
    return (
        <div className='home'>
            <CentralNavBar />
            <HomeNavBar />
            <BusinessCards />
        </div>
    );
};

export default Home;
