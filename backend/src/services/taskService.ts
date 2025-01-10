import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface taskProps {
    title: string,
    status: boolean,
    userId: string,
    dueDate?: Date, // O campo de data é opcional
}


// A estrutura segue os padrões de POO utilizando funções encapsuladas em uma classe
export class TaskService {

    // CREATE
    async create({ title, status, userId, dueDate }: taskProps) {
        try {
            // Criação da tarefa no banco de dados
            const task = await prisma.task.create({
                data: {
                    title,
                    status,
                    userId, // Relacionamento com o usuário
                    dueDate,
                },
            });
    
            return task;
        } catch (error) {
            throw new Error("Erro ao criar tarefa!");
        }
    }

    // READ (por titulo)
    async getTasksByTitle(title: string) {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    title: {
                        // Contém a fração do título
                        contains: title,
                        // Tornar a busca insensível a maiúsculas/minúsculas
                        mode: 'insensitive', 
                    },
                },
            });
    
            if (tasks.length === 0) {
                throw new Error("Nenhuma tarefa encontrada com esse título.");
            } else {
                return tasks;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar tarefas! Detalhes: ${error.message}`);
            }
            
            throw new Error("Erro ao buscar tarefas!");
        }
    }

    // READ (todos as tarefas por usuário)
    async getTasksByUser(userId: string) {
        try {
            const tasks = await prisma.task.findMany({
                where: { userId },
            });
    
            return tasks;
        } catch (error) {
            throw new Error("Erro ao obter tarefas do usuário!");
        }
    }

    // READ (todos as tarefas por usuário)
    async getAllTasks() {
        try {
            const tasks = await prisma.task.findMany();
    
            return tasks;
        } catch (error) {
            throw new Error("Erro ao obter tarefas!");
        }
    }

    // UPDATE
    async update(id: string, { title, status, userId, dueDate }: taskProps) {
        try {
            const task = await prisma.task.update({
                where: { id },
                data: {
                    title,
                    status,
                    dueDate,
                },
            });
    
            return task;
        } catch (error) {
            throw new Error("Erro ao atualizar tarefa!");
        }
    }

    // DELETE
    async delete(id: string) {
        try {
            const task = await prisma.task.delete({
                where: { id },
            });
    
            return task;
        } catch (error) {
            throw new Error("Erro ao deletar tarefa!");
        }
    }

}
