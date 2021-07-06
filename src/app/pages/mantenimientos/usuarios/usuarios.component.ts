import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/back/models/usuario.model';
import { BusquedaService } from 'src/app/back/services/busqueda.service';
import { ModalImagenService } from 'src/app/back/services/modal-imagen.service';
import { UsuarioService } from 'src/app/back/services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.less']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuarioTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  public imgSub: Subscription

  constructor(
    private _usuarioService: UsuarioService,
    private _busquedaService: BusquedaService,
    private _modalImagenService: ModalImagenService,
  ) { }
  

  ngOnInit(): void {
    this.listUsuario();
    this.imgSub = this._modalImagenService.nuevaImagen
    .pipe( delay(100))
    .subscribe( img => this.listUsuario() )
  }

  listUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsurios(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuarioTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina(valor) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.listUsuario();
  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
      return this.usuarios = this.usuarioTemp;
    }

    this._busquedaService.buscar('usuarios', termino).subscribe( ( resp: Usuario[] ) => {
      this.usuarios =  resp;
    })
  }

  deleteUsuario( usuario: Usuario ) {

    if( usuario.id === this._usuarioService.usuario.id ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: "Esta seguro de realizar esta operación?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.deleteUsuario( usuario ).subscribe( resp => {
          this.listUsuario();
          Swal.fire('Usuario borrado', 'Elmininado correctamente', 'success')
        });
      }
    })
  }

  cambiarRol( usuario: Usuario ) {
    this._usuarioService.cambiarUsuario( usuario ).subscribe( resp => {
      console.log( resp );
    });
  }

  abrirModal( usuario: Usuario) {
    this._modalImagenService.abrirModal( 'usuarios', usuario.id, usuario.img );
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }
}
