import { Express, Request, Response } from "express";
import { createUser } from "../controllers/userController";

// Mapeia as endpoints de usuário para o Controlador

// (app: Express) garante que os parametros sejam instâncias válida do Express
export const userRoutes = (app: Express) => {
    /* Configuração de rota HTTP POST, 
        req envia os dados para o servidor e 
        res envia uma resposta para o cliente
    */
    app.post("/user", (req: Request, res: Response) => createUser(req, res));

    /* Registra uma nova rota no servidor com o id do usuário, 
        req pega o valor do id do usuario
        res envia uma resposta para o cliente
    */
    //app.get("/user/:id", (req: Request, res: Response) => getUser(req, res));
};
