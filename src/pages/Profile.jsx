import { useState, useEffect, useRef } from "react";
import "./ProfilePictureButton.css"; // Import CSS file
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Firestore functions
import { db } from "/src/config/firebase.js"; // Import Firestore from firebase.js

const ProfilePictureButton = () => {
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "Loading...",
    email: "Loading...",
    university: "Loading...",
    year: "Loading..."
  });

  const [reviews, setReviews] = useState([]); // Store user's reviews
  const fileInputRef = useRef(null);
  const userDocId = "DyRZqx76PMw2eIYztJqg"; // Replace with actual document ID

  // Fetch user data & reviews when the profile page loads
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

          // Load profile picture if available
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

    fetchUserData();
    fetchUserReviews();
  }, []);

  // Handle image selection
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Trigger file input when clicking the "+" button
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Profile Picture */}
        <div className="profile-picture">
          <img src={image || "/default-avatar.png"} alt="Profile" className="profile-image" />
          <button className="plus-button" onClick={handleButtonClick}>+</button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden-input"
          onChange={handleImageChange}
        />

        {/* User Info Labels */}
        <div className="vbox">
          <label className="profile-label">Name: {userInfo.name}</label>
          <label className="profile-label">Email: {userInfo.email}</label>
          <label className="profile-label">University: {userInfo.university}</label>
          <label className="profile-label">Year: {userInfo.year}</label>
        </div>
      </div>

      {/* Scrollable Reviews Section (Below Profile Section) */}
      <div className="reviews-section">
        <h2>User Reviews</h2>
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-card">
                <h3>{review.Restaurant}</h3>
                <p><strong>Rating:</strong> {review.Rating}/5</p>
                <p>{review.Review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureButton;
