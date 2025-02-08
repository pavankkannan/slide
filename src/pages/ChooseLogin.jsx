import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ChooseLogin = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();

  const handleRole = () => {
    if (selectedRole === "Student") {
      navigate("/StudentLogin");
    } else if (selectedRole === "Business") {
      navigate("/BusinessLogin");
    }
  };

  const handleRegister = () => {
    navigate("/Register")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        backgroundColor: "#FFFFFF",
        color: "#4D4D4D",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "350px", height: "70px", backgroundColor: "#FD3535", borderRadius: "50px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" , color: "white"}}>
          Choose Your Login
        </h1>
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            padding: "20px",
            border: `2px solid #FD3535`,
            backgroundColor: `${selectedRole === "Student" ? "#FD3535" : "white"}`,
            borderRadius: "10px",
            textAlign: "center",
            cursor: "pointer",
            width: "100px",
          }}
          onClick={() => setSelectedRole("Student")}
        >
          <h2 style={{ color: `${selectedRole === "Student" ? "white" : "#FD3535"}`, }}>Student</h2>
          <img style={{ width: "100%" }}src="/assets/student.png"/>
        </div>

        <div
          style={{
            padding: "20px",
            border: `2px solid #FD3535`,
            backgroundColor: `${selectedRole === "Business" ? "#FD3535" : "white"}`,
            borderRadius: "10px",
            textAlign: "center",
            cursor: "pointer",
            width: "100px",
          }}
          onClick={() => setSelectedRole("Business")}
        >
          <h2 style={{ color: `${selectedRole === "Business" ? "white" : "#FD3535"}`}}>Business</h2>
          <img style={{ width: "100%" }}src="/assets/businessman.png"/>
        </div>
      </div>

      {selectedRole && (
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#FD3535",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleRole}
        >
          Continue as {selectedRole}
        </button>
      )}

      <button
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4D4D4D",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default ChooseLogin;