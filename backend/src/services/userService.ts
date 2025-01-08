import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface userProps{
    name: string,
    email: string,
    password: string
}

// A estrutura segue os padrões de POO utilizando funções encapsuladas em uma classe
export class UserService {

    // CREATE
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

    // READ (por id)
    async getById(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }else{
                return user;
            }
        } catch (error) {
            // Se o erro for uma instância de Error, lança o erro com a mensagem apropriada
            if (error instanceof Error) {
              console.error(`Erro ao buscar usuário com ID ${id}: ${error.message}`);
              throw new Error(`Erro ao obter usuário! Detalhes: ${error.message}`);
            }
            
            // Caso o erro não seja uma instância de Error, lança um erro genérico
            console.error("Erro inesperado ao buscar o usuário:", error);
            throw new Error("Erro ao obter usuário!");
        }
    }

    // UPDATE
    async update(id: string, { name, email, password }: userProps) {
        try {
          const user = await prisma.user.update({
            where: { id },
            data: {
              name,
              email,
              password,
            },
          });
    
          return user;
        } catch (error) {
          throw new Error("Erro ao atualizar usuário!");
        }
      }
    
    // DELETE
    async delete(id: string) {
        try {
          const user = await prisma.user.delete({
            where: { id },
          });
    
          return user;
        } catch (error) {
          throw new Error("Erro ao deletar usuário!");
        }
    }

    // Registrar usuário
    async register({name, email, password}: userProps) {
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
