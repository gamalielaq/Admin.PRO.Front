import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone
  ) {

  }

  async updateFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {

      const url = `${baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch(url, {     //fetch --> permite hacer peticiones http de una manera muy facil
        method: 'PUT',
        headers: {
          'token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

