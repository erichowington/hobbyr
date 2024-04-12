import api from "./apiConfig";

export const getProjects = async () => {
  try {
    const response = await api.get("/projects/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post("/projects/", projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}/`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id, projectData) => {
  try {
    const response = await api.delete(`/projects/${id}/`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProjectsByType = async (projectType) => {
  try {
    const response = await api.get(`/projects/type/${projectType}/`);
    return response.data;
  } catch (error) {
    throw error;  // Re-throwing the error to be handled by the caller
  }
};