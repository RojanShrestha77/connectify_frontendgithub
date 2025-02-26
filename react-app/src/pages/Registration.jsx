// frontend/src/components/Registration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData); // Fixed endpoint
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      setFormData({ fullName: "", username: "", email: "", password: "" });
      navigate(`/LoginSignUp`);//${response.data.user.id}`);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-page">
      <h2>Register for Connectify</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;