import { Express } from 'express';
import PokemonController from './pokemon.controller';
import authenticateToken from '../../middlewares/authToken';

/**
 * @swagger
 * tags:
 *  name: Pokemon
 *  description: API para interactuar con los Pokemones
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      Page:
 *          type: number
 *          default: 1
 *      Limit:
 *          type: number
 *          default: 10
 *      Pokemon:
 *          type: object
 *          properties:
 *              name: 
 *                  type: string
 *                  description: Nombre del Pokemon
 *              image:
 *                  type: string
 *                  description: URL de la imagen del Pokemon
 *              types:
 *                  type: array
 *                  description: Tipo de Pokemon
 *                  items:
 *                      type: string
 *              weight:
 *                  type: number
 *                  description: Peso del Pokemon
 *              abilities:
 *                  type: array
 *                  description: Habilidades del Pokemon
 *                  items:
 *                      type: string
 *      PokemonDetail:
 *          type: object
 *          properties:
 *              name: 
 *                  type: string
 *                  description: Nombre del Pokemon
 *              image:
 *                  type: string
 *                  description: URL de la imagen del Pokemon
 *              types:
 *                  type: array
 *                  description: Tipo de Pokemon
 *                  items:
 *                      type: string
 *              weight:
 *                  type: number
 *                  description: Peso del Pokemon
 *              abilities:
 *                  type: array
 *                  description: Habilidades del Pokemon
 *                  items:
 *                      type: string
 *              moves:
 *                  type: array
 *                  description: Movimientos del Pokemon
 *                  items:
 *                      type: string
 *              
 *      PaginatedPokemons:
 *          type: object
 *          properties:
 *              count:
 *                  type: number
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Pokemon'
 *                  
 */

export default class PokemonRouter {
    private routeController: PokemonController;

    constructor(app: Express, routeController: PokemonController = new PokemonController()){
        this.routeController = routeController;
        this.configureRoutes(app);
    }

    private configureRoutes(app: Express){

        /**
         * @swagger
         * paths:
         *  /pokemon:
         *   get:
         *      summary: Muestra los pokemons de forma paginada.
         *      tags: [Pokemon]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *          - in: query
         *            name: page
         *            schema:
         *                $ref: '#/components/schemas/Page'
         *            required: false
         *            description: Pagina actual de la consulta paginada
         *          - in: query
         *            name: limit
         *            schema:
         *                $ref: '#/components/schemas/Limit'
         *            required: false
         *            description: Limite de cuantos son listados
         *      requestBody:
         *          required: false
         *      responses:
         *          200:
         *              description: Devuelve de forma paginada los pokemons.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/PaginatedPokemons'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/pokemon')
        .get(authenticateToken, this.routeController.getPaginatedPokemons);

        /**
         * @swagger
         * paths:
         *  /pokemon/{id}:
         *   get:
         *      summary: Trae detalladamente un pokemon.
         *      tags: [Pokemon]
         *      parameters:
         *          - in: header
         *            name: authorization
         *            schema:
         *               type: string
         *            required: true
         *            description: Token de Autorizacion
         *          - in: path
         *            name: id
         *            schema:
         *                oneOf:
         *                  - number
         *                  - string
         *            required: true
         *            description: Nombre o ID del pokemon
         *      requestBody:
         *          required: false
         *      responses:
         *          200:
         *              description: Devuelve el Pokemon detallado.
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/PokemonDetail'
         *          400:
         *              description: Devuelve un error en el proceso.
         *          401:
         *              description: Acceso no autorizado.
         */
        app.route('/pokemon/:id')
        .get(/*authenticateToken,*/ this.routeController.getPokemonDetail);
    }
}


