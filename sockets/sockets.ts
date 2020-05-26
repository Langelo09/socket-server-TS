import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


// Exportar instacia del usuarios-lista
export const usuariosConectados = new UsuarioLista;

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {

        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);

    });

}

//Escuchar Mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }, callback) => {

        console.log('Mensaje recibido', payload);

        //Enviar mensajes a todos los usuarios
        io.emit('mensaje-nuevo', payload );

    });
        
};

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });

}