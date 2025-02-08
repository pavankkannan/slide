import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Promotions.css";
const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a className="nav-link back-button" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => {
                navigate(`/Reviews`);}}>Reviews</a>
            <a className="nav-link" onClick={() => {
                navigate(`/Promotions`);}}>Promotions</a>
        </nav>
    );
};

const Promotions = () => {
    return (
        <>
        <NavBar/>
        <h2>Now Promotions</h2>
        </>
    );
};

export default Promotions;
