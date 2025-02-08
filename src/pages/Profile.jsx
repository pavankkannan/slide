import { useState, useEffect, useRef } from "react";
import "./ProfilePictureButton.css"; // Import CSS file
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Firestore functions
import { db } from "/src/config/firebase.js"; // Import Firestore from firebase.js
import { useNavigate } from "react-router-dom";
import { useAuth}

const ProfilePictureButton = ({ user }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "Loading...",
    email: "Loading...",
    university: "Loading...",
    year: "Loading..."
  });

  const [reviews, setReviews] = useState([]);
  const fileInputRef = useRef(null);
  const userDocId = user.uid; // Replace with actual document ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const userDocRef = doc(db, "Users", userDocId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          console.log("User data found:", docSnap.data());
          setUserInfo({
            name: docSnap.data().username || "Unknown",
            email: docSnap.data().schoolEmail || "Unknown",
            university: docSnap.data().university || "Unknown",
            year: docSnap.data().year || "Unknown"
          });

          setImage(docSnap.data().profilePicture || "/default-avatar.png");
        } else {
          console.log("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserReviews = async () => {
      try {
        console.log("Fetching user reviews...");
        const reviewsRef = collection(db, "Users", userDocId, "Reviews");
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

    fetchUserData();
    fetchUserReviews();
  }, []);

  return (
    <div className="container">
      {/* 🔹 Back to Home Button (Top-Right) */}
      <button className="nav-button" onClick={() => navigate("/Home")}>
        Return Back
      </button>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-picture">
          <img src={image || "/default-avatar.png"} alt="Profile" className="profile-image" />
          <button className="plus-button" onClick={() => fileInputRef.current.click()}>+</button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden-input"
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();

              reader.onload = (e) => {
                setImage(e.target.result);
              };

              reader.readAsDataURL(file);
            }
          }}
        />

        <div className="vbox">
          <label className="profile-label">Name: {userInfo.name}</label>
          <label className="profile-label">Email: {userInfo.email}</label>
          <label className="profile-label">University: {userInfo.university}</label>
          <label className="profile-label">Year: {userInfo.year}</label>
        </div>
      </div>

      {/* Scrollable Reviews Section */}
      <div className="reviews-section">
        <h2>User Reviews</h2>
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (

            reviews
            .map(review => (
              <div key={review.id} className="review-card">
                  <h3>{review.Restaurant || "Unknown Restaurant"}</h3>
                  <p><strong>Rating:</strong> {review.Rating ? `${parseFloat(review.Rating)}/5` : "No rating available"}</p>
                  <p>{review.Review ? review.Review : "No review available"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureButton;
