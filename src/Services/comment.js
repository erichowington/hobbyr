import api from "./apiConfig";

export const getCommentsByProjectId = async (projectId) => {
  try {
    const response = await api.get(`projects/${projectId}/comments/`);
    return response.data; // Assuming the server responds with the data directly
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Optionally re-throw to handle it in component
  }
};


export const addComment = async (projectId, commentBody) => {
  try {
    const response = await api.post(`projects/${projectId}/add_comment/`, {
      comment_body: commentBody, // Ensure this matches the expected backend API
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const updateComment = async (id) => {
  try {
    const response = await api.put(`comments/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
