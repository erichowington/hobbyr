import React from 'react'
import "./CommentModal.css"
import {useState, useEffect } from 'react'
import { getCommentsByProjectId, addComment } from '../../Services/comment.js'


const CommentModal = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({comment_body: ''});

  useEffect(() => {
      const fetchComments = async () => {
          setLoading(true);
          try {
              const data = await getCommentsByProjectId(projectId);
              setComments(data);
              setLoading(false);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
      };

      fetchComments();
  }, [projectId]);


  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!newComment.comment_body.trim()) return; // Prevents adding empty comments
    try {
      const response = await addComment(projectId, newComment.comment_body);
      console.log('Before update:', comments);
      console.log('After update:', setComments);

      if (response) { // Assuming addComment resolves to the new comment object
        setComments(comments => [...comments, response]); // Use a functional update for safety
        setNewComment({comment_body: ''}); // Reset the input
      }
    } catch (err) {
      setError(err.message);
      console.error(err.response ? err.response.data : err); // Log detailed error information
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className='comment-container'>
          <h1>Comments</h1>
          <form onSubmit={handleAddComment}>
              <textarea
                  name='comment_body'
                  value={newComment.comment_body}
                  onChange={(e) => setNewComment({comment_body: e.target.value})}
                  placeholder="Write your comment here..."
              ></textarea>
              <button type="submit">Add Comment</button>
          </form>
          <ul>
              {comments.map((comment, index) => (
                  <li key={index}>
                      <strong>{comment.user_profiles.username}:</strong>
                      {comment.comment_body}
                      {comment.formatted_created_at}
                      <br />
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default CommentModal;