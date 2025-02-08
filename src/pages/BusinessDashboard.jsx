import { useState, useEffect } from "react";
import "./BusinessDashboard.css";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function BusinessDashboard() {
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("promotions");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("Success");
            } else {
                navigate("/BusinessLogin"); // Redirect to login if not authenticated
                console.log("fail");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Business Dashboard</h1>
            <div className="dashboard-tabs">
                <button onClick={() => setTab("promotions")} className={tab === "promotions" ? "active" : ""}>Promotions</button>
                <button onClick={() => setTab("loyalty")} className={tab === "loyalty" ? "active" : ""}>Loyalty Program</button>
                <button onClick={() => setTab("edit")} className={tab === "edit" ? "active" : ""}>Edit Business Page</button>
            </div>
            <div className="dashboard-content">
                {tab === "promotions" && <Promotions />}
                {tab === "loyalty" && <LoyaltyProgram />}
                {tab === "edit" && <EditBusiness />}
            </div>
        </div>
    );
}

function Promotions() {
    const [showPopup, setShowPopup] = useState(false);
    const [dealText, setDealText] = useState("");

    const handleAddDeal = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setDealText("");
    };

    const handleSaveDeal = () => {
        console.log("New Deal: ", dealText);
        setShowPopup(false);
        setDealText("");
    };

    return (
        <div>
            <h2>Manage Promotions</h2>
            <p>Here you can create and manage your promotions.</p>
            <button className="add-deal-button" onClick={handleAddDeal}>Add New Deal</button>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Add a New Deal</h3>
                        <textarea
                            value={dealText}
                            onChange={(e) => setDealText(e.target.value)}
                            placeholder="Enter your promotion details here..."
                        />
                        <div className="popup-actions">
                            <button onClick={handleSaveDeal}>Save</button>
                            <button onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function LoyaltyProgram() {
    return <div><h2>Loyalty Program</h2><p>Manage customer points and rewards.</p></div>;
}

function EditBusiness() {
    return <div><h2>Edit Business Page</h2><p>Modify your business details and settings.</p></div>;
}
