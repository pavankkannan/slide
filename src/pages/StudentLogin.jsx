import { useState } from "react";
import "./StudentLogin.css";

export default function StudentLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Add login functionality here
        console.log("Logging in with", email, password);
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
