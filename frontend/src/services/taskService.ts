import axios from 'axios';

const API_URL = "http://localhost:3000";

interface userProps { 
    title: string,
    status: boolean,
    dueDate?: Date,
    userId: string
}

// Buscar tarefas do usuário
export const createTask = async ({title, status, dueDate, userId}: userProps) => {
    try {
        const response = await axios.post(`${API_URL}/task`, { title, status, dueDate, userId });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};


export const getTasksByUser = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};

// Buscar tarefas do usuário
export const updateTask = async (id: string, {title, status, dueDate, userId}: userProps) => {
    try {
        const response = await axios.put(`${API_URL}/task/${id}`, {title, status, dueDate, userId});
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar tarefas:', error);
        throw error;
    }
};

// Buscar tarefas do usuário
export const deleteTask = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/task/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};