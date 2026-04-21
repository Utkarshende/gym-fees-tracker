import { useEffect, useState } from "react";
import API from '../services/api.js';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New State

  const handlelogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* Password Field with Toggle */}
      <div style={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.passwordInput}
        />
        <span 
          onClick={() => setShowPassword(!showPassword)} 
          style={styles.toggleIcon}
        >
          {showPassword ? "Hide" : "View"} 
        </span>
      </div>

      <button onClick={handlelogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "100px auto",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    color: "#000",
  },
  passwordWrapper: {
    position: "relative", // Needed for absolute positioning of the icon
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    padding: "10px",
    paddingRight: "45px", // Leave room for the icon
    borderRadius: "6px",
    border: "1px solid #ccc",
    color: "#000",
    width: "100%",
  },
  toggleIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#666",
    userSelect: "none",
  },
  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
  },
};

export default Login;