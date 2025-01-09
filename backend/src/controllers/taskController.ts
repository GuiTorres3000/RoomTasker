import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
const taskService = new TaskService();

// CREATE
export const createTask = async (req: Request, res: Response): Promise<any>  => {
    try {
        // Pegar as informações do body
        const { title, status, userId } = req.body as { title: string, status: boolean, userId: string };

        // Verificar se os campos obrigatórios não estão nulos ou vazios
        if (!title || !status || !userId) {
            return res.status(400).json({ message: "Todos os campos (title, status, userId) são obrigatórios." });
        }else{
            // Criar a tarefa usando o serviço
            const task = await taskService.create({ title, status, userId });

            // Resposta com a tarefa criada
            res.status(201).json(task);
        }
    } catch (error) {
        // Resposta HTTP com status 500, erro de servidor
        res.status(500).json({ message: "Erro ao criar tarefa", error });
    }
};

// READ - Obter todas as tarefas de um usuário
export const getTasksByTitle = async (req: Request, res: Response) => {
    try {
        // Pegando o title da URL
        const { title } = req.params as {title: string };  
        // Pegando uma lista das tarefas
        const tasks = await taskService.getTasksByTitle(title);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter tarefas por titulo", error });
    }
};

export const getTasksByUser = async (req: Request, res: Response) => {
    try {
        // Pegando o userId da URL
        const { userId } = req.params as {userId: string };  
        // Pegando uma lista das tarefas
        const tasks = await taskService.getTasksByUser(userId);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter tarefas do usuário", error });
    }
};

// UPDATE
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, status, dueDate, userId } = req.body;

        const updatedTask = await taskService.update(id, { title, status, dueDate, userId });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar tarefa", error });
    }
};

// DELETE
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deleteTask = await taskService.delete(req.params.id);

        if (deleteTask) {
            res.status(200).json({ message: "Tarefa deletada com sucesso", deleteTask });
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar tarefa", error });
    }
};
