import React from 'react'
import "./CommentModal.css"
import {useState, useEffect } from 'react'
import { getCommentsByProjectId, addComment } from '../../Services/comment.js'
import Modal from 'react-modal';


const CommentModal = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({comment_body: ''});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement('#root');


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: 'auto',
      left: '0',
      right: '0',
      bottom: '0',
      marginRight: 'auto',
      transform: 'translate(0, 0)',
      maxHeight: '80%', // Set max height for modal
      overflow: 'auto',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      padding: '20px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  };

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



 

  
  // Suppresses modal-related console warnings
  
 
  
   
  




  return (
      <div className='comment-container'>
        <button onClick={openModal}>Open Bottom Sheet</button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
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

          <button onClick={closeModal}>Close</button>
          </Modal>
      </div>
  );
};

export default CommentModal;