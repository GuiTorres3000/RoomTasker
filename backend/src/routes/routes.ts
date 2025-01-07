import { Request, Response } from "express";
import { userController } from "../controllers/userController";

// Define a rota de teste
export function routes(app: any) {
    app.get("/teste", (req: Request, res: Response) => {
        res.json({ ok: true });
    });

    app.post("/user", async (req: Request, res: Response) => {
        await new userController().handle(req, res);
    });
}