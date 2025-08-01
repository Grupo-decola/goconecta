import { api } from "../api";


export const login = async (email, password) => {
  const response = await api.post("Authentication/login", { email, password });
  localStorage.setItem("accessToken", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};

export const getToken = () => localStorage.getItem("accessToken");

export const getDecodedToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  const payload = token.split('.')[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

