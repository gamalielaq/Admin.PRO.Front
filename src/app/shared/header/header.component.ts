import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/back/models/usuario.model';
import { UsuarioService } from 'src/app/back/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout() {
    this._usuarioService.logout();
  }

  buscar( termino:string ) {
    if( termino.length === 0 ) return;
    this._router.navigateByUrl(`/dashboard/buscar/${ termino }`)
  }

}
