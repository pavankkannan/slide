import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react"; // Install using: npm install qrcode.react
import "./Spot.css"; // Reusing the same CSS file

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a className="nav-link back-button" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => {
                navigate(-1);
                navigate("/Home");}}>Reviews</a>
            <a className="nav-link" onClick={() => {
                navigate(-1);
                navigate("/Promotions");}}>Promotions</a>
        </nav>
    );
};

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [newPromo, setNewPromo] = useState("");
    const [qrCode, setQrCode] = useState("");

    // Handle adding a new promotion
    const addPromotion = () => {
        if (newPromo.trim() !== "") {
            setPromotions([...promotions, newPromo]);
            setNewPromo("");
        }
    };

    // Handle applying a promotion to generate a QR code
    const applyPromotion = (promo) => {
        setQrCode(promo);
    };

    return (
        <div className="promotions-container">
            <NavBar />

            <h1 className="promotions-title">Promotions</h1>

            {/* Promotion Submission */}
            <div className="promo-input-container">
                <input
                    type="text"
                    value={newPromo}
                    onChange={(e) => setNewPromo(e.target.value)}
                    placeholder="Enter a new promotion"
                    className="promo-input"
                />
                <button onClick={addPromotion} className="promo-add-button">Add Promotion</button>
            </div>

            {/* List of Promotions */}
            <ul className="promo-list">
                {promotions.map((promo, index) => (
                    <li key={index} className="promo-item">
                        <span>{promo}</span>
                        <button onClick={() => applyPromotion(promo)} className="apply-button">
                            Apply & Get QR
                        </button>
                    </li>
                ))}
            </ul>

            {/* QR Code Display */}
            {qrCode && (
                <div className="qr-code-container">
                    <h3>Scan to Redeem:</h3>
                    <QRCode value={qrCode} size={150} />
                </div>
            )}
        </div>
    );
};

export default Promotions;
