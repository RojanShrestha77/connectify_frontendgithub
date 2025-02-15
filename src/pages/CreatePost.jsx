import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './CreatePost.css';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    return (
        <div className="createpost-overlay">
            <div className="createpost-wrapper">
                <div className="createpost-header">
                    <Link to="/Feed">
                        <CloseIcon className="close-icon" />
                    </Link>
                </div>
                <div className="createpost-content">
                    <div className="createpost-user">
                        <Avatar
                            alt="User Avatar"
                            src="https://example.com/avatar.jpg" // Replace with actual user avatar URL
                            className="user-avatar"
                        />
                    </div>
                    <div className="createpost-input">
                        <textarea
                            className="post-textarea"
                            placeholder="What's happening?"
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                <div className="createpost-actions">
                    <div className="action-icons">
                        <ImageIcon className="action-icon" />
                    </div>
                    <Button variant="contained" className="post-button">
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;