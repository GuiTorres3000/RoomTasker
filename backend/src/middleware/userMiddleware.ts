import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Acesso negado, token ausente" });
    }

    // Valide o token aqui (por exemplo, com JWT)
    // Se for válido, continue para a próxima função
    next();
};