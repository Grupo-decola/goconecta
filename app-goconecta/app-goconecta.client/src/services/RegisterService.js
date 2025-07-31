import { api } from "../api";

export const registerUser = async (registerUserDTO) => {
  try {
    const response = await api.post("/Users", registerUserDTO);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};
