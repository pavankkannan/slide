import { useState } from "react";
import "./Register.css";

export default function Register() {
    const [role, setRole] = useState("student");
    const [formData, setFormData] = useState({
        profilePicture: "",
        username: "",
        schoolEmail: "",
        password: "",
        repeatPassword: "",
        university: "",
        businessName: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        businessEmail: "",
        businessPicture: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Registering", formData);
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
            </div>
        </div>
    );
}
