import express from "express";
import routes from "./routes/routes";

const app = express();

app.use(routes);

app.listen(3000, () => console.warn("Servidor rodando na porta 3000."));