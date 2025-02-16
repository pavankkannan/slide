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
            <h1 className="brand-title">Slide</h1>
            <nav className='nav-links'>
                <button onClick={handleClick("Home")} className='nav-button'>Home</button>
                <button onClick={handleClick("Gmap")} className='nav-button'>Map</button>
                <button onClick={handleClick("Profile")} className='nav-button'>Profile</button>
            </nav>
        </div>
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
                    let imageUrl = "/assets/default.png";

                    if (businessData.businessPicture) {
                        try {
                            const imageRef = ref(storage, businessData.businessPicture);
                            imageUrl = await getDownloadURL(imageRef);
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
            <div className="hero-section">
                <h2 className="hero-title">Discover the Best Businesses Around You</h2>
                <p className="hero-subtitle">Explore new deals, find hidden gems, and connect with your favorite spots.</p>
            </div>
            <BusinessCards />
        </div>
    );
};

export default Home;
