import React, {useRef, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";
import NavbarLanding from "./NavbarLanding"

const LandingPage = () => {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log("Target div is visible!");
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 } // Triggers when 50% of the div is visible
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

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

            <motion.section
                className="about-section"
                initial={{ opacity: 0, x: -100 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                ref={targetRef}
            >
                <h2 className="about-heading">
                    What is Slide?
                </h2>
                <p className="about-text">
                    Slide is your gateway to amazing student perks! We partner with local businesses near your university to bring you exclusive discounts and reward programs—helping you save money while supporting local shops, cafés, and more.
                </p>
                <ul className="about-list">
                    <li className="about-li">Exclusive Student Discounts – Deals only available to registered students.</li>
                    <li className="about-li">Earn Rewards – The more you shop, the more you save!</li>
                    <li className="about-li">Support Local Businesses – Discover and enjoy the best spots around campus.</li>
                </ul>
            </motion.section>
        </div>
    );
};

export default LandingPage;
