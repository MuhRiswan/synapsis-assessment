import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
