import { Express } from "express";
import AuthentificationController from "./authentification.controller";
import AuthentificationRouter from "./authentification.routes";

export default class AuthentificationModule {
    public routes : AuthentificationRouter;

    constructor(app: Express){
        this.routes = new AuthentificationRouter(app, new AuthentificationController());
    }
}