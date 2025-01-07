// Server.ts implementado com fastify, não será utilizado pois usarei Express
/*
import fastify from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";

// Cria uma instância do Fastify com o logger habilitado (Registrar automaticamente mensagens de log)
const app = fastify( {logger: true} );

// Adicionando uma rota de teste
app.get('/', async (request, reply) => {
    return { message: 'Servidor rodando!' };
});


// Função assíncrona (pois, precisa esperar processos serem iniciados) para iniciar o servidor
const start = async () => {

    // Espera o registro do plugin CORS para o servidor e das rotas
    await app.register(cors);
    await app.register(routes);


    try{
        // Espera até o app rodar na porta 3000
        await app.listen({ port:3000})
    }catch(err){
        // Encerra o processo da aplicação caso ocorra erro
        process.exit(1)
    }
}

// Chama a função start para iniciar o servidor
start();