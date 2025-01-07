// Server.ts implementado com Express

import express from "express";
import { userRoutes } from "./routes/userRoutes";
import cors from "cors";

// Cria uma instância do Express
const app = express();

// Usa o middleware CORS (É usado para permitir interação entre diferentes origens)
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Adicionando uma rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Servidor rodando!' });
});

// Usa as rotas importadas
userRoutes(app);

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});