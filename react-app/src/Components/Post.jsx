import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/users/posts");
        console.log("Fetched posts:", response.data.posts);
        setPosts(response.data.posts || []); // Ensure posts is an array
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Run once on mount

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    const fullUrl = `http://localhost:5000/${imageUrl}`;
    console.log("Generated image URL:", fullUrl);
    return fullUrl;
  };

  return (
    <div className="post-feed">
      <h1>For you</h1>
      <hr className="divider" />
      {loading ? (
        <p>Loading Posts...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts to display</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <p>
              <strong>
                {post.User?.fullName || "Unknown User"} (@{post.User?.username || "unknown"})
              </strong>
              <br />
              {post.content || "(No content)"}
            </p>
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
                  onLoad={() => console.log("Image loaded:", getImageUrl(post.imageUrl))}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Post;