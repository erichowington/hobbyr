import api from "./apiConfig";

export const getFavorites = async (id) => {
  try {
    const response = await api.get(`/favorites/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const Favorite = async (id) => {
//   console.log("Attempting to favorite project with ID:", id);
//   try {
//     // Correcting the parameter name used in the POST request
//     const response = await api.post("/favorite/", { project_id: id });
//     return response.data;
//   } catch (error) {
//     console.error("Error in Favorite function:", error);
//     throw error; // Consider what you want to do with the error here
//   }
// };
export const Favorite = async (projectId) => {
  const userProfileId = localStorage.getItem("userProfileId"); // Retrieve from local storage or state
  if (!userProfileId) {
    console.error("User profile ID is undefined.");
    return; // Early return or throw an error
  }

  const payload = {
    user_profile: userProfileId,
    projects: projectId,
  };

  try {
    const response = await api.post("/favorite/", payload);
    return response.data;
  } catch (error) {
    console.error("Error in Favorite function:", error);
    throw error;
  }
};
