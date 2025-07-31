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
