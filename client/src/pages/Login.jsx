import { useState } from "react";
import API from "../services/api.js";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(true); // 🔥 toggle login/register
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const url = isLogin ? "/auth/login" : "/auth/register";

      const res = await API.post(url, { email, password });

      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Admin Login" : "Create Account"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* Password Field */}
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

      <button onClick={handleSubmit} style={styles.button}>
        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
      </button>

      {/* 🔄 Toggle */}
      <p style={styles.switchText}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)} style={styles.switchBtn}>
          {isLogin ? " Register" : " Login"}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "320px",
    margin: "100px auto",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    color: "#000",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    padding: "10px",
    paddingRight: "50px",
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
  },
  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
  },
  switchText: {
    fontSize: "14px",
    textAlign: "center",
  },
  switchBtn: {
    color: "#22c55e",
    cursor: "pointer",
    marginLeft: "5px",
    fontWeight: "bold",
  },
};

export default Login;