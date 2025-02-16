import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Spot.css";
import Reviews from "./Reviews";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

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

    // Debugging: Check if business data is properly passed
    useEffect(() => {
        console.log("🚀 Business Data Received:", business);
        if (business) {
            console.log("✅ Business Name:", business.businessName);
            console.log("✅ Business User ID:", business.userID);
        } else {
            console.error("❌ No business data received.");
        }
    }, [business]);

    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            if (!business || !business.userID) {
                console.error("❌ Error: Business userID is undefined.");
                return;
            }

            try {
                console.log("🔍 Fetching promotions for businessUserID:", business.userID);

                const promotionsQuery = query(
                    collection(db, "Promotions"),
                    where("businessUserID", "==", business.userID)
                );

                const querySnapshot = await getDocs(promotionsQuery);
                if (querySnapshot.empty) {
                    console.log("⚠️ No promotions found for this business.");
                }

                const promotionsList = querySnapshot.docs.map(doc => ({
                    id: doc.data().businessUserID,
                    ...doc.data(),
                }));

                console.log("📌 Promotions Retrieved:", promotionsList);
                setPromotions(promotionsList);
            } catch (error) {
                console.error("❌ Error fetching promotions:", error);
            }
        };

        fetchPromotions();
    }, [business]);

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

            <div className="promotions-section">
                <h2>Promotions</h2>
                {promotions.length > 0 ? (
                    <ul>
                        {promotions.map((promo) => (
                            <li key={promo.id}>{promo.promotionText}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No promotions available for this business.</p>
                )}
            </div>
        </div>
    );
}

export default Spot;
