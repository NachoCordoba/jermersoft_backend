import { Express } from 'express';
import UserController from './user.controller';
import authenticateToken from '../../middlewares/authToken';

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API de Usuarios
 */

/**
 * @swagger
 * components:
 *  schemas: 
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
 */
export default class UserRouter {
    private routeController: UserController;

    constructor(app: Express, routeController: UserController = new UserController()){
        this.routeController = routeController;
        this.configureRoutes(app);
    }

    private configureRoutes(app: Express){
        app.route('/user')
        .get(authenticateToken, this.routeController.getPaginatedUser);

        /**
         * @swagger
         * paths:
         *  /user/{userName}:
         *   get:
         *      summary: Obtiene Usuario por Nombre.
         *      tags: [User]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *          - in: query
         *            name: userName
         *            schema:
         *               type: string
         *            required: true
         *            description: Nombre de Usuario a Buscar
         *      responses:
         *          200:
         *              description: Devuelve el Usuario.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/User'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/user/:userName')
        .get(authenticateToken, this.routeController.getUserByName);

        /**
         * @swagger
         * paths:
         *  /user:
         *   post:
         *      summary: Agrega un Usuario.
         *      tags: [User]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *      requestBody:
         *          required: true
         *          description: Datos del Usuario.
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/User'
         *      responses:
         *          200:
         *              description: Devuelve el Usuario Creado.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/User'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/user')
        .post(authenticateToken, this.routeController.addUser);

        /**
         * @swagger
         * paths:
         *  /user/{id}:
         *   delete:
         *      summary: Elimina un Usuario.
         *      tags: [User]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *          - in: query
         *            name: id
         *            schema:
         *               type: string
         *            required: true
         *            description: ID Usuario a Eliminar
         *      responses:
         *          200:
         *              description: Devuelve el Usuario Eliminado.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/User'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/user/:id')
        .delete(authenticateToken, this.routeController.deleteUser);

        /**
         * @swagger
         * paths:
         *  /user/{id}:
         *   put:
         *      summary: Modifica un Usuario.
         *      tags: [User]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *          - in: query
         *            name: id
         *            schema:
         *               type: string
         *            required: true
         *            description: ID Usuario a Modificar
         *      requestBody:
         *          required: true
         *          description: Datos del Usuario a Modificar.
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/User'
         *      responses:
         *          200:
         *              description: Devuelve el Usuario Modificado.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/User'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/user/:id')
        .put(authenticateToken, this.routeController.updateUser);
    }
}


