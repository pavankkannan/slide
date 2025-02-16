import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useAuth } from "../config/AuthContext";

export default function StudentLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await logIn(email, password);
            const userID = userCredential.user.uid;

            // Check if userID exists in any document in the Businesses collection
            const usersRef = collection(db, "Users");
            const usersSnapshot = await getDocs(usersRef);
            const userExists = usersSnapshot.docs.some(doc => doc.data().userID === userID);

            if (userExists) {
                console.log("User logged in successfully");
                navigate("/Home");
            } else {
                setError("User is not registered as a User.");
                console.error("UserID not found in Users collection");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error logging in: ", error);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Student Login</h1>
            <div className="login-form">
                <input
                    type="email"
                    placeholder="Email"
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
