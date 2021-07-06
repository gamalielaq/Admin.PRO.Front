export class Hospital {
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUsuario
    ) {}
}
interface _HospitalUsuario {
    _id: string;
    nombre: string;
    email: string;
    img: string;
}
