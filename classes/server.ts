import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
//SocketIO
import socketIO from 'socket.io';
//HTTP
import http from 'http';
// Lógica de Sockets
import * as socket from '../sockets/sockets';

//Clase del servidor, donde contiene las propiedades
export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    //Encargador de hacer todos los eventos de los sockets
    public io: socketIO.Server;

    //Servidor Http que se levantará para los sockets
    private httpServer: http.Server;

    private constructor(){ //Private implementa singleton para no crear varias instancias

        this.app = express();

        // Se importa la variable del puerto del archivo de configuración global
        this.port = SERVER_PORT;

        //Iniciar o crear servidor HTTP con la configuración de la app de express
        this.httpServer = new http.Server(this.app);

        //Inicia la libreria de socketIO en el servidor creado httpServer
        this.io = socketIO(this.httpServer);

        this.escucharSockets();

    }

    // Se implementa el patron Singleton para no crear varias instancias
    public static get instance() {

    return this._instance || (this._instance = new this());

    }

    //Escuchar Sockets
    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');

        //Escuchar cuando una persona se conecta a la app mediante sockets
        this.io.on('connection', cliente => {
        
            // console.log('Cliente conectado');
            console.log(cliente.id);

            // Lógica en el archivo sockets.ts

            //Conectar cliente
            socket.conectarCliente(cliente);
            
            // Configurar Usuario
            socket.configurarUsuario(cliente, this.io);

            //Mensajes
            socket.mensaje(cliente, this.io);

            //DESCONECTAR
            socket.desconectar(cliente);


        });

    }

    //Método para levantar el servidor
    start(callback: Function){

    this.httpServer.listen(this.port, callback());

    }

}