import './LoginSignup.css';
import { Link, useNavigate } from "react-router-dom";
import back from '../assets/Images/greek.png';
import React, { useState } from 'react';

const LoginSignup = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/Feed');
  }

  return (
    <div className="container">
      <div className="bg_image">
        <img src={back} alt="background"></img>
        <h1 className="connectify-logo"></h1>
      </div>
      <form className="form-container" >
        <h1 className="connectify">Connectify</h1>
        <p className="welcome">Welcome Back</p>
        <div className="input-group">
          <input type="text" id="username" name="username" placeholder="Username" />
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" className="submit-button" onClick={handleLogin}>
          <span>Login</span> {/* Add span for the button text */}
        </button>
        <nav className="signup-register-container">
          <div className="signup">
            <p>Don't have an account?</p>
          </div>
          <div className="register">
            <Link to="/Register">Register</Link>
          </div>
        </nav>
      </form>
    </div>
  );
};

export default LoginSignup;