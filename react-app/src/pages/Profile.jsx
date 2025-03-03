import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Profile.css";
import ProfilePicture from "../assets/Images/profile_pic.png"; // Import the local image file

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

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    const fullUrl = `http://localhost:5000/${imageUrl}`;
    console.log("Generated image URL:", fullUrl);
    return fullUrl;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-page"> {/* Unique class for the Profile page */}
      <h1>User Profile</h1>
      {user ? (
        <>
          <div className="profile-details">
            {/* Profile Picture */}
            <div className="profile-picture-container">
              <img
                src={ProfilePicture} // Use the imported local image
                alt="Profile"
                className="profile-picture"
              />
            </div>
            {/* Profile Details */}
            <div className="profile-info">
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <hr />
          <h2>Posts</h2>
          <div className="posts-container">
            {user.posts && user.posts.length > 0 ? (
              user.posts.map((post) => (
                <div key={post.id} className="post-card">
                  <p>{post.content}</p>
                  {post.imageUrl && (
                    <div className="image-container">
                      <img
                        className="post-image"
                        src={getImageUrl(post.imageUrl)}
                        alt="Post"
                        onError={(e) => {
                          console.error("Image failed to load:", getImageUrl(post.imageUrl));
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/150"; // Fallback
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No posts to display</p>
            )}
          </div>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;