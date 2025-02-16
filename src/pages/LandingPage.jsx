import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";
import NavbarLanding from "./NavbarLanding"

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
                {/* <NavbarLanding /> */}
                <nav className="navbar-container">
                    <h1 className="brand-title" onClick={() => navigate("/")}>Slide</h1>
                    <div className="nav-links">
                        <Link className="nav-item" to={"/Register"}>Register</Link>
                        <Link className="nav-item" to={"/StudentLogin"}>Student Login</Link>
                        <Link className="nav-item" to={"/BusinessLogin"}>Business Login</Link>
                    </div>
                </nav>
            <motion.section
                className="landing-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="landing-heading">Unlock Student Discounts & Earn Rewards</h2>
                <p className="landing-text">
                    Slide connects students with exclusive deals and loyalty rewards at small businesses near their university. Save money, support local businesses, and enjoy perks just for being a student!
                </p>
                <button onClick={() => navigate("/Register")} className="start-btn">
                    Sign Up & Start Saving Today
                </button>
            </motion.section>

            <div className="landing-about">
                <h2 className="landing-heading">
                    What is Slide?
                </h2>
                <p className="landing-text">
                    Slide is your gateway to amazing student perks! We partner with local businesses near your university to bring you exclusive discounts and reward programs—helping you save money while supporting local shops, cafés, and more.

                    - Exclusive Student Discounts – Deals only available to registered students.
                    - Earn Rewards – The more you shop, the more you save!
                    - Support Local Businesses – Discover and enjoy the best spots around campus.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
