import { json, urlencoded } from 'body-parser';
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import AuthentificationModule from './modules/authentification/authentification.module';
import PokemonModule from './modules/pokemon/pokemon.module';
import UserModule from './modules/user/user.module';

import { SwaggerUiOptions } from 'swagger-ui-express'
import swaggerUi from 'swagger-ui-express';

export default class Server {
    private app: Express = express();
    private port: Number;

    constructor({port, mongoUri}: { port: Number, mongoUri: string }){
        this.port = port;

        this.configure();
        this.startMongo(mongoUri);
        this.initModules();
    }

    public configureSwagger({ specs }: { specs: SwaggerUiOptions}){
        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(specs, {explorer: true}),
        );
    }

    private configure(){
        this.app.use(
            (req: Request, res: Response, next: NextFunction)=>{
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
                res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
                res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
                next();
            }
        );

        this.app.use(urlencoded({ extended: false }));
        this.app.use(json());
    }

    public startServer(){
        this.app.listen(this.port, ()=>{
            console.log('Esuchando el puerto: ', this.port);
        });
    }

    private startMongo(mongoUri: string){
        mongoose.connect(mongoUri, { },()=>{
            console.log('Conectado correctamente a la bases de datos.');
        });
    }

    private initModules(){
        new UserModule(this.app);
        new AuthentificationModule(this.app);
        new PokemonModule(this.app);
    }

}