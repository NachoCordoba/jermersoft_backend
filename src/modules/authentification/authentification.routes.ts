import { Express } from 'express';
import AuthentificationController from './authentification.controller';

/**
 * @swagger
 * tags:
 *  name: Authentification
 *  description: API de Authentificacion
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      AuthUser:
 *          type: object
 *          properties:
 *              userName: 
 *                  type: string
 *                  description: Nombre del Usuario
 *                  required: true
 *              userPassword:
 *                  type: string
 *                  description: Clave del Usuario
 *      User:
 *          type: object
 *          properties:
 *              userName:
 *                  type: string
 *                  description: Nombre de Usuario
 *              userPassword:
 *                  type: string
 *                  description: Clave del Usuario
 *              userEmail:
 *                  type: string
 *                  description: Email del Usuario
 *      AuthUserResponse:
 *          type: object
 *          properties:
 *              user: 
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                  description: Usuario
 *              jwt:
 *                  type: string
 *                  description: Json Web Token
 */

export default class AuthentificationRouter {
    private routeController: AuthentificationController;

    constructor(app: Express, routeController: AuthentificationController = new AuthentificationController()){
        this.routeController = routeController;
        this.configureRoutes(app);
    }



    private configureRoutes(app: Express){
        /**
         * @swagger
         * paths:
         *  /auth:
         *   post:
         *      summary: Login de Usuario.
         *      tags: [Authentification]
         *      requestBody:
         *          required: true
         *          description: Datos del Usuario.
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/AuthUser'
         *      responses:
         *          200:
         *              description: Devuelve el token del usuario y el usuario.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/AuthUserResponse'
         *          400:
         *              description: Devuelve un error en el proceso.
         */
        app.route('/auth')
        .post(this.routeController.login);

        /**
         * @swagger
         * paths:
         *  /auth/register:
         *   post:
         *      summary: Registro de Usuario.
         *      tags: [Authentification]
         *      requestBody:
         *          required: true
         *          description: Datos del Usuario.
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/User'
         *      responses:
         *          200:
         *              description: Devuelve el token del usuario y el usuario.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/AuthUserResponse'
         *          400:
         *              description: Devuelve un error en el proceso.
         */
        app.route('/auth/register')
        .post(this.routeController.register);

    }
}


