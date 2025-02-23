// frontend/src/components/LoginSignup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Added import
import back from "../assets/Images/greek.png";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log("Login Successful", response.data); // Fixed typo
      alert("Login Successful"); // Fixed typo
      setFormData({ username: "", password: "" });
      navigate("/Feed");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="bg_image">
        <img src={back} alt="background" />
        <h1 className="connectify-logo"></h1>
      </div>
      <form className="form-container">
        <h1 className="connectify">Connectify</h1>
        <p className="welcome">Welcome Back</p>
        {error && <p className="error">{error}</p>} {/* Added error display */}
        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username} // Controlled input
            onChange={handleChange}   // Updates formData
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password} // Controlled input
            onChange={handleChange}   // Updates formData
            required
          />
        </div>
        <button type="submit" className="submit-button" onClick={handleLogin}>
          <span>Login</span>
        </button>
        <nav className="signup-register-container">
          <div className="signup">
            <p>Don't have an account?</p>
          </div>
          <div className="register">
            <Link to="/register">Register</Link> {/* Updated to lowercase for consistency */}
          </div>
        </nav>
      </form>
    </div>
  );
};

export default LoginSignup;