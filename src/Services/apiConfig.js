import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

const api = axios.create({
  baseURL: "https://hobbyr-db-fe2543498be7.herokuapp.com/",
});

api.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
