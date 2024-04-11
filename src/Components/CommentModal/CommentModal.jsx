import React from 'react'
import "./CommentModal.css"
import {useState, useEffect } from 'react'
import { getCommentsByProjectId } from '../../Services/comment.js'
import { getUserProfile } from '../../Services/userProfile';


const CommentModal = ({ projectId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='comment container'>
            <h1>Comments</h1>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.user_profiles.username}:</strong>
                        {comment.comment_body}
                        <br />
                        <small>Posted on {new Date(comment.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentModal;