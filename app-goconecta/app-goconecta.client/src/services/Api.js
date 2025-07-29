import axios from 'axios';

const API_BASE_URL = 'https://localhost:7093/Api'; 

export const fetchPackages = async () => {
  try {
    // Faça a requisição GET para o seu endpoint de pacotes no C#
    const response = await axios.get(`${API_BASE_URL}/packages`); // Supondo que seu endpoint seja /api/packages
    return response.data; // Os dados que vêm do seu back-end C#
  } catch (error) {
    console.error('Erro ao buscar pacotes da API:', error);
    // Você pode lançar o erro novamente para que o componente Packages.jsx o capture
    throw error;
  }
};