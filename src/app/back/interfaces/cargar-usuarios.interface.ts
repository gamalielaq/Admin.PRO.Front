import { Usuario } from "../models/usuario.model";

export interface ListUsurio {
    total: number;
    usuario: Usuario[];
}