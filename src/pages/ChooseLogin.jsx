import { useState } from "react";

const ChooseLogin = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', backgroundColor: '#FFFFFF', color: '#4D4D4D' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Choose Your Login</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div
          style={{
            padding: '20px',
            border: `2px solid ${selectedRole === "student" ? "#FD3535" : "#4D4D4D"}`,
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100px'
          }}
          onClick={() => setSelectedRole("student")}
        >
          <h2>Student Login</h2>
        </div>

        <div
          style={{
            padding: '20px',
            border: `2px solid ${selectedRole === "business" ? "#FD3535" : "#4D4D4D"}`,
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100px'
          }}
          onClick={() => setSelectedRole("business")}
        >
          <h2>Business Login</h2>
        </div>
      </div>

      {selectedRole && (
        <button style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#FD3535',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Continue as {selectedRole}
        </button>
      )}

      <button style={{
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#4D4D4D',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Register
      </button>
    </div>
  );
};
  
  export default ChooseLogin;