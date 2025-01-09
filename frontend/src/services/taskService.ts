import axios from 'axios';

const API_URL = "http://localhost:3000";

// Buscar tarefas do usuário
export const getTasksByUser = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};