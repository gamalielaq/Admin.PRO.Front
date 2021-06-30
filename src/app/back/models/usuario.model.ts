import { environment } from '../../../environments/environment'
const baseUrl = environment.apiUrl;
export class Usuario {
    //?: --> Opcional
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public rol?: string,
        public id?: string
    ) { }

    get imagenUrl() {
        if( !this.img ) {
            return `${baseUrl}/upload/usuarios/no-image`
        }
        if( this.img.includes('https') ) {
            return this.img;
        }
        if( this.img ) {
            return `${baseUrl}/upload/usuarios/${this.img}`
        }else {
            return `${baseUrl}/upload/usuarios/no-image`
        }
    }
}