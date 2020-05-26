import { Usuario } from './usuario';

export class UsuarioLista {

    private lista: Usuario[] = [];

    constructor() {

    }

    // Agregar un usuario
    public agregar(usuario: Usuario){

        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;

    }

    // Actualizar usuario por ID
    public actualizarNombre(id: string, nombre: string){

        for(let usuario of this.lista){

            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }

        }

        console.log('====== Actualizando usuario ======');
        console.log(this.lista);

    }

    // Obtener lista de usuarios conectados
    public getLista(){
        return this.lista;
    }

    // Obtener un usuario
    public getUsuario(id: string){

        return this.lista.find( usuario => usuario.id === id );

    }

    // Obtener usuarios de una sala en particula
    public getUsuariosEnSala(sala: string){

        return this.lista.filter( usuario => usuario.sala === sala );

    }

    // Borrar un usuario
    public borrarUsuario(id: string){
        
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;

    }

}