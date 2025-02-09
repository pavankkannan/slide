import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Spot.css";
import Reviews from "./Reviews";

const NavBar = ({ business }) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <a className="nav-link" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => navigate(`/Reviews`, { state: business })}>Reviews</a>
            <a className="nav-link" onClick={() => navigate(`/Promotions`, { state: business })}>Promotions</a>
        </nav>
    );
};

function Spot() {
    const location = useLocation();
    const business = location.state;

    if (!business || Object.keys(business).length === 0) {
        return <div className="spot-container"><h1>Business not found</h1></div>;
    }

    return (
        <div className="spot-container">
            <NavBar business={business} />
            <h1 className="spot-title">{business.businessName}</h1>
            <p>{business.address}</p>
            <img src={business.businessPicture} alt={business.businessName} className="business-img" />
            <Reviews business={business} />
        </div>
    );
}

export default Spot;
