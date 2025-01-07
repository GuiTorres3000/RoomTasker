export default class UsersController {
    public get(req: any, res: any): void {
        res.json({ message: "Mensagem de Usuário"});
    }
}