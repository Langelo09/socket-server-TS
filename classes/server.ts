import express from 'express';
import { SERVER_PORT } from '../global/enviroment';

//Clase del servidor, donde contiene las propiedades
export default class Server {

    public app: express.Application;
    public port: number;

    constructor(){

        this.app = express();

        // Se importa la variable del puerto del archivo de configuración global
        this.port = SERVER_PORT;

    }

    //Método para levantar el servidor
    start(callback: Function){

    this.app.listen(this.port, callback());

    }

}