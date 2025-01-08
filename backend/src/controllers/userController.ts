import { Request, Response } from "express";
import { UserService } from "../services/userService";
const userService = new UserService();

// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        // Pegar as informações do body
        const {name, email, password} = req.body as {name: string, email: string, password: string}

        // Verificar se os campos não estão nulos ou vazios
        if (!name || !email || !password) {
            res.status(400).json({ message: "Todos os campos (name, email, password) são obrigatórios." });
        }else{
            const user = await userService.create({ name, email, password });

            // Respondendo com o usuário criado através do status 201
            res.status(201).json(user);
        }
    } catch (error) {
        // Resposta HTTP com status 500, erro de servidor
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};

// READ
export const getUser = async (req: Request, res: Response) => {
    try {
        // Extrai o id da URL
        const { id } = req.params;

        const user = await userService.getById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter usuário", error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        // Extrai o id da URL
        const { id } = req.params;
        // Extrai as informações do body da requisição
        const { name, email, password } = req.body;

        const updatedUser = await userService.update(id, { name, email, password });
        res.status(200).json(updatedUser);
    } catch (error) {
        // Resposta HTTP com status 500, erro de servidor
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        // Chama o método delete do serviço passando o ID do usuário
        const deleteUser = await userService.delete(req.params.id);

        // Verifica se o usuário foi encontrado e deletado
        if (deleteUser) {
            res.status(200).json({ message: "Usuário deletado com sucesso", deleteUser });
        } else {
            // Retorna status 404 se o usuário não for encontrado
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        // Resposta HTTP com status 500 em caso de erro
        res.status(500).json({ message: "Erro ao deletar usuário", error });
    }
};

// Registrar
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Pegar as informações do body
        const {name, email, password} = req.body as {name: string, email: string, password: string}

        // Verificar se os campos não estão nulos ou vazios
        if (!name || !email || !password) {
            res.status(400).json({ message: "Todos os campos (name, email, password) são obrigatórios." });
        }else{
            const user = await userService.register({ name, email, password });

            // Respondendo com o usuário criado através do status 201
            res.status(201).json(user);
        }
    } catch (error) {
        // Resposta HTTP com status 500, erro de servidor
        res.status(500).json({ message: "Erro ao registrar usuário", error });
    }
};