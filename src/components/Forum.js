import React, { useState, useEffect } from 'react';
import './Forum.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const mockPosts = [
        { id: 1, title: "City Event Feedback", content: "Share your feedback on recent events." },
        { id: 2, title: "Public Transport Issues", content: "Discuss issues with local transport." },
        { id: 3, title: "Parking Problems", content: "Discuss the issue of parking spaces in the city." },
        { id: 4, title: "Waste Management", content: "How can we improve waste management in our city?" }
      ];
      setPosts(mockPosts);
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  const addPost = () => {
    if (newPost) {
      setPosts([...posts, { id: posts.length + 1, title: newPost, content: "" }]);
      setNewPost("");
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>; // Display a loading message
  }

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>
      <div className="forum-posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
      <div className="new-post-section">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="New post title"
        />
        <button onClick={addPost}>Add Post</button>
      </div>
    </div>
  );
}

export default Forum;  // Keep only this one instance of export default