import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(
    private http: HttpClient
  ) { }

  
  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'token': this.token } }
  }


  private transformarUsuarios( resultados:any[]) : Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.id)
    );
  }

  buscar( tipo: 'usuarios'  | 'medicos'  | 'hospitales', termino: string = '' ) {
    return this.http.get<any[]>(`${ baseUrl }/todo/coleccion/${ tipo }/${ termino }`, this.headers ).pipe(
      map( (resp: any) => {
        switch ( tipo ) {
          case 'usuarios':
          return this.transformarUsuarios( resp.resultados );
          default:
            return [];
        }
      })
    );
  }
}
