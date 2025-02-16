import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Promotions.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const NavBar = ({ business }) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <a className="nav-link back-button" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => navigate(`/Reviews`, { state: business })}>Reviews</a>
            <a className="nav-link" onClick={() => navigate(`/Promotions`, { state: business })}>Promotions</a>
        </nav>
    );
};

const Promotions = () => {
    const location = useLocation();
    const business = location.state;
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            if (!business || !business.businessUserID) {
                console.error("Error: Business userID is undefined.");
                return;
            }

            try {
                const promotionsQuery = query(
                    collection(db, "Promotions"),
                    where("businessUserID", "==", business.businessUserID)
                );

                const querySnapshot = await getDocs(promotionsQuery);
                const promotionsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPromotions(promotionsList);
            } catch (error) {
                console.error("Error fetching promotions:", error);
            }
        };

        fetchPromotions();
    }, [business]);

    return (
        <div className="promotions-container">
            <NavBar business={business} />
            <h2>Current Promotions</h2>
            {promotions.length > 0 ? (
                <ul className="promotions-list">
                    {promotions.map((promo) => (
                        <li key={promo.id} className="promotion-item">{promo.promotionText}</li>
                    ))}
                </ul>
            ) : (
                <p>No promotions available for this business.</p>
            )}
        </div>
    );
};

export default Promotions;
