
import {Router, Request, Response} from 'express';

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

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });

});


export default router;