import axios from "axios";

export const API_URL = "https://localhost:7093/api/";
export const api = axios.create({
  baseURL: "https://localhost:7093/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
