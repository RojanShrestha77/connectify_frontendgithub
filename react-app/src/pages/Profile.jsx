import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams(); // Extract username from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/user/${username}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile; // Corrected export from 'App' to 'Profile'