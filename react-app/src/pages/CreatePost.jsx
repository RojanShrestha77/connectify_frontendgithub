import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreatePost.css";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content && !image) {
      console.log("No content or image provided");
      toast.error("Please enter text or select an image");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.log("No userId found in localStorage");
      toast.error("User not logged in. Please log in to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    formData.append("userId", userId);

    setIsLoading(true);
    try {
      console.log("Sending post request with data:", {
        content,
        userId,
        image: image ? image.name : null,
      });
      const response = await axios.post("http://localhost:5000/api/users/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Post created successfully:", response.data);
      toast.success("Post created successfully!");
      setContent("");
      setImage(null);
      setImagePreview(null);
      fileInputRef.current.value = "";
      setTimeout(() => navigate("/feed"), 1000);
    } catch (error) {
      console.error("Post creation failed:", error);
      if (error.response) {
        console.log("Server error response:", error.response.data);
        toast.error(error.response.data.message || "Failed to create post");
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="createpost-overlay">
      <ToastContainer />
      <div className="createpost-wrapper">
        <div className="createpost-header">
          <Link to="/feed">
            <CloseIcon className="close-icon" aria-label="Close" />
          </Link>
        </div>
        <div className="createpost-content">
          <div className="createpost-user">
            <Avatar
              alt="User Avatar"
              src="https://example.com/avatar.jpg"
              className="user-avatar"
            />
          </div>
          <div className="createpost-input">
            <textarea
              className="post-textarea"
              placeholder="What's happening?"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
              </div>
            )}
            {image && <p className="file-name">{image.name}</p>}
          </div>
        </div>
        <div className="createpost-actions">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<ImageIcon />}
            onClick={handleFileButtonClick}
            className="upload-button"
            aria-label="Upload Photo"
          >
            Upload Photo
          </Button>
          <Button
            variant="contained"
            className="post-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;