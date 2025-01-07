import { Request, Response } from "express";

// Define a rota de teste
export function routes(app: any) {
    app.get("/teste", (req: Request, res: Response) => {
        res.json({ ok: true });
    });
}