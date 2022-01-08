import { Express } from "express";
import PokemonController from "./pokemon.controller";
import PokemonRouter from "./pokemon.routes";

export default class PokemonModule {
    public routes : PokemonRouter;

    constructor(app: Express){
        this.routes = new PokemonRouter(app, new PokemonController());
    }
}