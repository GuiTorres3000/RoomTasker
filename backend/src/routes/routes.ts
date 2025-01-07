import { Router } from "express";
import UsersController from "../controllers/users.controllers";

const routes = Router();
const usersController = new UsersController();
routes.get("/users", usersController.get);

export default routes;