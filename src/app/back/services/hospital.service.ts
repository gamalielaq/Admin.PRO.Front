import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class HospitalService {
    public auth2: any;
    public usuario: Usuario;

    constructor(
        private http: HttpClient
    ) { }

    get token() {
        return localStorage.getItem('token') || '';
    }

    get headers() {
        return { headers: { 'token': this.token } }
    }



    listHospitales() {
        return this.http.get(`${baseUrl}/hospitales`, this.headers).pipe(
            map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
        );
    }

    createHospital( nombre: string ) {
        return this.http.post(`${baseUrl}/hospitales`, { nombre },  this.headers);
    }

    updateHospital(  _id: string, nombre: string ) {
        console.log(nombre);
        
        return this.http.put(`${baseUrl}/hospitales/${ _id }`, { nombre },  this.headers);
    }

    deleteteHospital(  _id: string ) {
        return this.http.delete(`${baseUrl}/hospitales/${ _id }`, this.headers);
    }

}

