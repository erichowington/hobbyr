import api from "./apiConfig";

export const getFollowers = async () => {
  try {
    const response = await api.get("/followers/");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const Follow = async (id) => {
    try {
      const response = await api.post(`/follow/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const Unfollow = async (id) =>{
  try {
    const response = await api.post(`/unfollow/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};