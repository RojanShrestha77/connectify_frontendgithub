import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './CreatePost.css';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const CreatePost = () => {
    return (
        <div className="createpost-overlay">
            <div className="createpost-wrapper">
                <button className="createpost-icon">
                    <AddIcon className="icon" />
                    <h2> Post</h2>
                </button>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                </div>
                <div>
                    <Link
                        to="/Feed"
                        style={{
                            color: 'white',
                            background: 'transparent',
                        }}
                    >
                        <CloseIcon
                            style={{
                                fontSize: '25px',
                            }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;