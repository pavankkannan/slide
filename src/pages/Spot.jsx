import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Spot.css";
import Reviews from "./Reviews";

function SbImg({ src }) {
    return (
        <img src={`/public/assets/${src}`} alt="Tea House" className="star-img" />
    );
}

let restaurantData = {
    name: "",
    addy: ""
}


const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a className="nav-link" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => {
                navigate(`/Reviews`, {state: restaurantData});
                }}>Reviews</a>
            <a className="nav-link" onClick={() => {
                
                navigate(`/Promotions`);}}>Promotions</a>
        </nav>
    );
};

const ReviewBlock = () => {
    return (
        <div className="review-block">
            <div className="review-img-container">
                <img src="public/assets/Five_Pointed_Star_Solid.svg.png" alt="Star" className="review-star" />
                <div className="starRating">
                    5.0
                </div>
            </div>
            <div className="review-content">
                <h2 className="review-username">Username</h2>
                <p className="review-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo mollitia quasi quam aut quos facere unde nisi corporis! Eum voluptates vitae voluptatum, suscipit ducimus quos rem maiores earum hic?
                </p>
            </div>
        </div>
    );
};

function Spot() {
    const location = useLocation();
    const business = location.state;

    restaurantData = {
        name: business.name,
        addy: business.address
    }

    return (
        <div className="spot-container">
            <NavBar />
            <h1 className="spot-title">{business.name}</h1>
            <p>{business.address}</p>
            <img src={`/assets/${business.src}`} alt="Tea House" className="star-img" />
            <ReviewBlock />
        </div>
    );
}

export default Spot;