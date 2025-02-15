import React, { useState, useEffect } from 'react';
import './Post.css';
import Trump from '../assets/Images/Trump.png';
import ronaldo from '../assets/Images/ronaldo.png';
import kpoli from '../assets/Images/kpoli.png';


const Post = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: 'Post 1 content', image_url: Trump },
    { id: 2, content: 'Post 2 content', image_url: kpoli },
    { id: 3, content: 'Post 3 content', image_url: ronaldo },
  ]);

  useEffect(() => {
    // Simulate fetching data from the backend
    // setPosts(mockPosts); // Uncomment and use when backend is ready
  }, []);

  return (
    <div className="post-feed">
      <h1>For you</h1>
      <hr className="divider"/>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <p>{post.content}</p>
          <div className="image-container">
            <img
              className="post-image"
              src={post.image_url}
              alt="Post"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;