import { Request, Response } from "express";
import { userService } from "../services/userService";

class userController{
    async handle(req: Request, res: Response) {
        const {name, email, password} = req.body as {name: string, email: string, password: string}
        console.log()

        const service = new userService();
        const user = await service.execute({name, email, password});
        //return res.json(user);
        return res.json({user: { name, email, password},serviceResponse: user});

    }
}

export { userController };