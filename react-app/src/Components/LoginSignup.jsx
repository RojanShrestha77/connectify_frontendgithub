import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      console.log("Sending login request with:", formData); // Log request data
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log("Raw response:", response); // Log full response object
      console.log("Response data:", response.data); // Log parsed data
      const { user } = response.data;
      console.log("User object:", user); // Log user object
      console.log("Username value:", user.username); // Log username specifically
      console.log("UserId value:", user.id); // Log id specifically

      // Set and verify localStorage
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id);
      console.log("After setItem - username in localStorage:", localStorage.getItem("username")); // Verify immediately
      console.log("After setItem - userId in localStorage:", localStorage.getItem("userId")); // Verify immediately

      alert("Login Successful");
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
      <form className="form-container" onSubmit={handleLogin}>
        <h1 className="connectify">Connectify</h1>
        <p className="welcome">Welcome Back</p>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          <span>Login</span>
        </button>
        <nav className="signup-register-container">
          <div className="signup">
            <p>Don't have an account?</p>
          </div>
          <div className="register">
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </form>
    </div>
  );
};

export default LoginSignup;