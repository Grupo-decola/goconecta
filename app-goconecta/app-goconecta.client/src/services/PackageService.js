import { api } from "../api";

export const fetchPackages = async (filters = {}) => {
  const { destination, minPrice, maxPrice, startDate, endDate } = filters;

  const params = {};
  if (destination) params.destination = destination;
  if (minPrice !== null && minPrice !== '') params.minPrice = minPrice;
  if (maxPrice !== null && maxPrice !== '') params.maxPrice = maxPrice;
  if (startDate) params.startDate = startDate.toISOString();
  if (endDate) params.endDate = endDate.toISOString();

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