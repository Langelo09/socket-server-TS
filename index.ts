import Server from "./classes/server";
//Importar la configuración de las variables globales
import { SERVER_PORT } from "./global/enviroment";
import router from "./routes/router";
//Importación de Body parser Serializar la petición por URL en un JSON
import bodyParser from 'body-parser';
//Importar el CORS
import cors from 'cors';


// Manejo y Configuración del servidor y de sockets

const server = new Server();

//BodyParser - Leer la URL para obtener información (Middleware)
server.app.use(bodyParser.urlencoded( {extended: true}) );
//Pasar la petición a formato JSON
server.app.use(bodyParser.json());

// CORS - Recibir peticiones de usuarios fuera del dominio [FRONT END]
server.app.use(cors( {origin:true, credentials:true}) );

// Se llaman las rutas de servicios del archivo router.ts
server.app.use('/', router);

server.start(() => {

console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);

});