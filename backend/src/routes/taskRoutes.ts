import { Express, Request, Response } from "express";
import { createTask, getTasksByTitle, getTasksByUser, updateTask, deleteTask} from "../controllers/taskController";

// Mapeia as endpoints de tarefa para o Controlador
export const taskRoutes = (app: Express) => {
    // Criar uma nova tarefa
    app.post("/task", (req: Request, res: Response) => createTask(req, res));

    // Obter todas as tarefas ou tarefas por título
    app.get("/tasks", (req: Request, res: Response) => getTasksByTitle(req, res));

    // Obter todas as tarefas de um usuário específico
    app.get("/tasks/user/:userId", (req: Request, res: Response) => getTasksByUser(req, res));

    // Atualizar uma tarefa existente
    app.put("/task/:id", (req: Request, res: Response) => updateTask(req, res));

    // Deletar uma tarefa existente
    app.delete("/task/:id", (req: Request, res: Response) => deleteTask(req, res));
};