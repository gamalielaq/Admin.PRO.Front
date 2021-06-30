import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ListUsurio } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone
  ) {
    this.googleInit();
  }


  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.id || '';
  }

  get headers() {
    return { headers: { 'token': this.token } }
  }


  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '937976820929-h5gnhldvqfvc3bqdr0b8p2afi2top93o.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    })
  };

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this._ngZone.run(() => {
        this._router.navigateByUrl('/login');
      })
    });
  }


  validarToken(): Observable<boolean> {
    const token = this.token;

    return this.http.get(`${baseUrl}/login/renew`, { headers: { 'token': token } }).pipe(
      map((resp: any) => {

        const { nombre, email, img = '', google, rol, id } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, rol, id);

        localStorage.setItem('token', resp.token); // nueva version del token

        return true;
      }),
      catchError(error => of(false)) // si sucede un error no logro hacer la autenticacion
    );

  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  deleteUsuario( usuario: Usuario) {

    return this.http.delete(`${baseUrl}/usuarios/${usuario.id}`, this.headers );

  }

  updatePerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.rol
    };
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, this.headers );
  }

  cambiarUsuario( usuario: Usuario ) {
    return this.http.put(`${baseUrl}/usuarios/${usuario.id}`, usuario , this.headers );
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  loginGoogle(token) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  cargarUsurios(desde: number = 0,) {
    return this.http.get<ListUsurio>(`${baseUrl}/usuarios?desde=${desde}`, this.headers).pipe(
      delay(500),
      map(resp => {

        const usuarios = resp.usuario.map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.rol, user.id));

        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }
}

