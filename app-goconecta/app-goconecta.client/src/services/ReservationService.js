import { api } from "../api";

export const fetchReservations = async () => {
  try {
    const response = await api.get("/reservations");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reservas da API:", error);
    throw error;
  }
};

export const createReservation = async (createReservationDTO) => {
  try {
    const response = await api.post("/reservations", createReservationDTO);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    throw error;
  }
};

export const getReservationById = async (id) => {
  try {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reserva por ID:", error);
    throw error;
  }
};
