import axios from "axios";

// Endereço certo da sua API
export const API_URL = "http://localhost:5062/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});