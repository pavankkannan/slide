import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessLogin.css";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export default function BusinessLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userID = userCredential.user.uid;

            // Check if userID exists in any document in the Businesses collection
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
