import { useState } from "react";
import "./Register.css";
import { db, storage } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        profilePicture: null,
        username: "",
        schoolEmail: "",
        password: "",
        repeatPassword: "",
        university: "",
        year: "",
        businessName: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        businessEmail: "",
        businessPicture: null,
    });

    const auth = getAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
    };

    const uploadImage = async (file) => {
        if (!file) return "";
        const storageRef = ref(storage, `uploads/${uuidv4()}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const isFormComplete = () => {
        if (role === "student") {
            return formData.profilePicture && formData.username && formData.schoolEmail && formData.password && formData.repeatPassword && formData.university && formData.year;
        } else {
            return formData.businessName && formData.address && formData.city && formData.zipCode && formData.state && formData.businessEmail && formData.password && formData.repeatPassword && formData.businessPicture;
        }
    };

    const handleSubmit = async () => {
        if (!isFormComplete()) return;
        console.log("Registering", formData);
        try {

            const email = role === "student" ? formData.schoolEmail : formData.businessEmail;
            const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
            const userID = userCredential.user?.uid;

            const profilePictureURL = await uploadImage(formData.profilePicture);
            const businessPictureURL = await uploadImage(formData.businessPicture);

            if(role == "student"){
                await addDoc(collection(db, "Users"), {
                    userID,
                    profilePicture: profilePictureURL,
                    username: formData.username,
                    schoolEmail: formData.schoolEmail,
                    password: formData.password,
                    university: formData.university,
                    year: formData.year,
                });
                navigate("/Home");
            } else {
                await addDoc(collection(db, "Businesses"), {
                    userID,
                    businessName: formData.businessName,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode,
                    state: formData.state,
                    businessEmail: formData.businessEmail,
                    password: formData.password,
                    businessPicture: businessPictureURL,
                });
                navigate("/BusinessDashboard");
            }
            console.log("User added successfully with ID:", userID);
        } catch (error) {
            setError(error);
            console.error("Error adding user: ", error);
        }
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Register as {role === "student" ? "Student" : "Business"}</h1>
            <div className="role-selection">
                <button className={role === "student" ? "selected" : ""} onClick={() => setRole("student")}>Student</button>
                <button className={role === "business" ? "selected" : ""} onClick={() => setRole("business")}>Business</button>
            </div>
            <div className="registration-form">
                {role === "student" ? (
                    <>
                        <input type="file" name="profilePicture" onChange={handleChange} />
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                        <input type="email" name="schoolEmail" placeholder="School Email" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleChange} />
                        <input type="text" name="university" placeholder="University" onChange={handleChange} />
                        <input type="text" name="year" placeholder="Graduation Year" onChange={handleChange} />
                    </>
                ) : (
                    <>
                        <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} />
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                        <input type="text" name="city" placeholder="City" onChange={handleChange} />
                        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} />
                        <input type="text" name="state" placeholder="State" onChange={handleChange} />
                        <input type="email" name="businessEmail" placeholder="Business Email" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleChange} />
                        <input type="file" name="businessPicture" onChange={handleChange} />
                    </>
                )}
                <button className="register-button" onClick={handleSubmit}>Register</button>
                <h1 className="error-message">{error}</h1> 
            </div>
        </div>
    );
}
