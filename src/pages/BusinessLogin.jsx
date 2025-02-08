import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessLogin.css";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useAuth } from "../config/AuthContext";

export default function BusinessLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useAuth();
    const navigate = useNavigate();

    // if (currentUser) {
    //     navigate("/BusinessDashboard");
    // }

    const handleLogin = async () => {
        try {
            const userCredential = await logIn(email, password); 
            const userID = userCredential.user.uid;
            // if (!userID) {
            //     throw new Error("Authentication failed. UserID not found.");
            // }

            // Check if userID exists in the Businesses collection
            const businessesRef = collection(db, "Businesses");
            const businessesSnapshot = await getDocs(businessesRef);
            const businessExists = businessesSnapshot.docs.some(doc => doc.data().userID === userID);

            if (businessExists) {
                console.log("Business logged in successfully");
                navigate("/BusinessDashboard");
            } else {
                setError("User is not registered as a business.");
                console.error("UserID not found in Businesses collection");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error logging in: ", error);
        }
    };



    return (
        <div className="login-container">
            <h1 className="login-title">Business Login</h1>
            <div className="login-form">
                <input
                    type="email"
                    placeholder="Business Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <h1 className="error-message">{error}</h1> 
                <button
                    onClick={handleLogin}
                    className="login-button"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
