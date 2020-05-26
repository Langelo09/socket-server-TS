
import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

//Se ocupa para creación de servicios REST Tradicional
const router = Router();

//Servicio Get
router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'GET - Listo!!'
    });

});

//Servicio Post
router.post('/mensajes', (req: Request, res: Response) => {

    //Leer información establecida en index.ts
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de: de,
        cuerpo:cuerpo
    }

    // Conectar el servicio REST con el servidor de sockets para mensajes a todos
    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    //Leer información de URL establecida en index.ts
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de: de,
        cuerpo:cuerpo
    }

    // Conectar el servicio REST con el servidor de sockets para mensajes privados
    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });

});

// Servicio para obtener todos los ID's de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;

    // Función de la libreria IO que barre todos los clientes en un arreglo
    server.io.clients((err: any, clientes: string[]) => {

        if (err){
            return res.json({
                ok: false,
                err: err
            })
        }
    
        res.json({
            ok: true,
            clientes: clientes
        });

    });

});

// Servicio o Función para obtener los usuarios por su nombre
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    usuariosConectados

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});

export default router;