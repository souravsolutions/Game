import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_RAWG_BASE_URL,
  timeout: 1000,
  params: {
    key: import.meta.env.VITE_RAWG_KEY,
  },
});

export default api;
