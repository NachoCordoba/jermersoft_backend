import dotenv from 'dotenv';
import Server from "./Server";
import swaggerJsdoc from 'swagger-jsdoc';

import swaggerOptions from './config/swagger';

dotenv.config();

const envConfig = {
    mongoUri: process.env.MONGO_URI as string,
    port: Number(process.env.SERVER_PORT)
}



const instance = new Server(envConfig);
const specs = swaggerJsdoc(swaggerOptions);

instance.configureSwagger({ specs })
instance.startServer();

// TO DO
/**
 * - Más Abstraccion
 * - Más Modularizacion
 * - Manejo de Errores, con codigos correctos.
 * - Mejorar Configuracion del proyecto
 * - Mejorar Documentacion.
 */