import { api } from "../api";

export const fetchPackages = async (params = {}) => {
  try {
    const response = await api.get("/packages", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pacotes da API:", error);
    throw error;
  }
};

export const fetchPackageDetail = async (id) => {
  try {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do pacote da API:", error);
    throw error;
  }
};
