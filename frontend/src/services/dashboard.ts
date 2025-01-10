import axios from 'axios';

const API_URL = "http://localhost:3000";

export const getUser = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};