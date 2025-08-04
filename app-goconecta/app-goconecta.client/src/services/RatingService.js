import { api } from "../api";

/**
 * Envia um novo rating para um pacote.
 * @param {number|string} packageId - ID do pacote
 * @param {{stars: number, comment: string}} data - Dados do rating
 * @returns {Promise<any>} Resposta da API
 */
export const createRating = async (packageId, data) => {
  if (!packageId) {
    throw new Error("packageId é obrigatório");
  }
  if (!data?.stars || !data?.comment) {
    throw new Error("Dados de avaliação incompletos");
  }
  try {
    const response = await api.post(`packages/${packageId}/ratings`, data);
    return response.data;
  } catch (error) {
    console.log("erro ao criar avaliação", error);
    throw error;
  }
};

export const fetchRatings = async (packageId) => {
  try {
    const response = await api.get(`packages/${packageId}/ratings`);
    return response.data;
  } catch (error) {
    console.log("erro ao obter reviews", error);
    throw error;
  }
};
