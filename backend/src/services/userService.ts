import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface userProps{
    name: string,
    email: string,
    password: string
}

export class UserService {
    async create({name, email, password}: userProps) {
        try {
            // Criação do usuário no banco de dados
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password, 
                },
            });
    
            return user;
        } catch (error) {
            throw new Error("Erro ao criar usuário!");
        } 
    }
    
}
