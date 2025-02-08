import { useState, useEffect } from "react";
import "./BusinessDashboard.css";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";

export default function BusinessDashboard() {
    const [tab, setTab] = useState("promotions");
    const navigate = useNavigate();
    const { user } = useAuth(); // Ensure userID is retrieved

    useEffect(() => {
        if (!user) {
            navigate("/BusinessLogin");
        }
    }, [user, navigate]);

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
                {tab === "promotions" && <Promotions user={user} />}
                {tab === "loyalty" && <LoyaltyProgram />}
                {tab === "edit" && <EditBusiness />}
            </div>
        </div>
    );
}

function Promotions({ user }) {
    const [showPopup, setShowPopup] = useState(false);
    const [dealText, setDealText] = useState("");
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            const q = query(collection(db, "Promotions"), where("businessUserID", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const dealsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDeals(dealsList);
        };

        fetchDeals();
    }, [user]);


    const handleAddDeal = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setDealText("");
    };

    const handleSaveDeal = async () => {
        if (!dealText.trim()) return;

        console.log("Current User: ", user);

        if (!user || !user.uid) {
            console.error("User is not authenticated.");
            return;
        }

        try {
            await addDoc(collection(db, "Promotions"), {
                businessUserID: user.uid,
                promotionText: dealText,
            });
            console.log("New Deal Saved: ", dealText);
            setShowPopup(false);
            setDealText("");
        } catch (error) {
            console.error("Error saving deal: ", error);
        }
    };

    return (
        <div>
            <h2>Manage Promotions</h2>
            <p>Here you can create and manage your promotions.</p>
            <button className="add-deal-button" onClick={handleAddDeal}>Add New Deal</button>

            <ul className="deals-list">
                {deals.map((deal) => (
                    <li key={deal.id}>{deal.promotionText}</li>
                ))}
            </ul>

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
