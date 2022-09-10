import axios from "axios";

const api = axios.create({
  baseURL: "https://gama-academy-api.herokuapp.com",
});

export default api;
