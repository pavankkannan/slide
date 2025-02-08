import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Promotions.css";
const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a className="nav-link back-button" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => {
                navigate(-1);
                navigate(`/Reviews`);}}>Reviews</a>
            <a className="nav-link" onClick={() => {
                navigate(-1);
                navigate(`/Promotions`);}}>Promotions</a>
        </nav>
    );
};

const Promotions = () => {
    (
        <h1>HELL WORLD</h1>
    );
};

export default Promotions;
