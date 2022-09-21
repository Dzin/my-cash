import axios from "axios";

const api = axios.create({
  baseURL: "https://finances-control-backend-dev-for-tech.vercel.app/",
  // baseURL: "https://finances-control-backend-dev-for-tech.vercel.app/",
  // withCredentials: true,
});

export default api;
