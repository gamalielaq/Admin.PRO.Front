import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/back/models/usuario.model';
import { SidebarService } from 'src/app/back/services/sidebar.service';
import { UsuarioService } from 'src/app/back/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  menuItems: any;
  public imgUrl = ''; 
  
  constructor(
    private _sideService: SidebarService,
    private _usuarioService: UsuarioService
  ) { 
    this.menuItems = _sideService.menu;
    this.imgUrl = _usuarioService.usuario.imagenUrl
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
