import axios from 'axios';

const API_URL = "http://localhost:3000";

// Interface para o tipo de dados do usuário
interface userProps { 
    email: string;
    password: string;
}

// Função para login
export const registerUser = async (name: string, {email, password}: userProps) => {
    try {
        // Enviar requisição para cadastrar
        const response = await axios.post(`${API_URL}/user`, { name, email, password });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login!');
    }
};

export const loginUser = async ({email, password}: userProps) => {
    try {
        // Enviar requisição para cadastrar
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login!');
    }
};