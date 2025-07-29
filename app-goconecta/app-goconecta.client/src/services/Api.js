import axios from 'axios';

const API_BASE_URL = 'https://localhost:7093/Api'; 

export const fetchPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`); 
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar pacotes da API:', error);
  
    throw error;
  }
};