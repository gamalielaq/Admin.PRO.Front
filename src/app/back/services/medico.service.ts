import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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


  listMedicos() {
    return this.http.get(`${baseUrl}/medicos`, this.headers).pipe(
      map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
    );
  }
  getMedicoById( id: string) {
    return this.http.get(`${baseUrl}/medicos/${id}`, this.headers).pipe(
      map((resp: { ok: boolean, medico: Medico }) => resp.medico )
    );
  }

  createMedico(medico: {nombre: string,  hospital:string }) {
    return this.http.post(`${baseUrl}/medicos`, medico, this.headers);
  }

  updateMedico( medico: Medico ) {
    return this.http.put(`${baseUrl}/medicos/${medico._id}`, medico, this.headers);
  }

  deleteteMedico( _id: string ) {
    return this.http.delete(`${baseUrl}/medicos/${_id}`, this.headers);
  }
  
}