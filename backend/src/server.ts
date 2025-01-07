import fastify from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";

const app = fastify( {logger: true} );

// Adicionando uma rota de teste
app.get('/', async (request, reply) => {
    return { message: 'Servidor rodando!' };
});


const start = async () => {

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

start();