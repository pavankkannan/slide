import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "/src/config/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a className="nav-link" onClick={() => navigate(-1)}>Back</a>
            <a className="nav-link" onClick={() => navigate(`/Reviews`)}>Reviews</a>
            <a className="nav-link" onClick={() => navigate(`/Promotions`)}>Promotions</a>
        </nav>
    );
};

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const location = useLocation();
    const business = location.state;
    const userDocId = "DyRZqx76PMw2eIYztJqg"; // Replace with actual document ID

    // Get the restaurant name passed from navigation
    const searchParams = new URLSearchParams(location.search);
    const restaurantName = searchParams.get("restaurant") || business.name; // Change default as needed


    

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
              console.log("Fetching user reviews...");
              const reviewsRef = collection(db, "Users", userDocId, "Reviews"); // Get the Reviews subcollection
              const querySnapshot = await getDocs(reviewsRef);
              const userReviews = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              setReviews(userReviews);
              console.log("User reviews retrieved:", userReviews);
            } catch (error) {
              console.error("Error fetching user reviews:", error);
            }
          };

        const fetchReviews = async () => {
            try {
                console.log(`Fetching reviews for: ${business.name}`);
                
                // Reference to the "Reviews" collection
                const reviewsRef = collection(db, "Reviews");
                
                // Query for reviews matching the restaurant name
                const q = query(reviewsRef, where("Restaurant", "==", restaurantName));
                const querySnapshot = await getDocs(q);
                
                const userReviews = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setReviews(userReviews);
                console.log("User reviews retrieved:", userReviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchUserReviews();
    }, [restaurantName]);

    return (
        <div>
            <NavBar />
            <h2>Reviews for {restaurantName}</h2>
            <div className="reviews-container">
                {reviews.length === 0 ? (
                    <p>No reviews found.</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <h3>{review.user}</h3>
                            <p>{review.Review}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;