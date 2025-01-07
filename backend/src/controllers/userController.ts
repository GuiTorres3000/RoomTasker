import { Request, Response } from "express";
import { UserService } from "../services/userService";
const userService = new UserService();

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

/*
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserService(Number(req.params.id));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter usuário", error });
    }
};*/