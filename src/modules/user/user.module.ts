import { Express } from "express";
import UserController from "./user.controller";
import UserRouter from "./user.routes";

export default class UserModule {
    public routes : UserRouter;

    constructor(app: Express){
        this.routes = new UserRouter(app, new UserController());
    }
}