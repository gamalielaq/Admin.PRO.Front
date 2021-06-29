import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/back/models/usuario.model';
import { FileUploadService } from 'src/app/back/services/file-upload.service';
import { UsuarioService } from 'src/app/back/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _fileUploadService: FileUploadService,

  ) {
    this.usuario = _usuarioService.usuario
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actulizarPerfil() {
    this._usuarioService.updatePerfil(this.perfilForm.value).subscribe(() => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, ( err ) => {
      Swal.fire('Guardado', err.error.msg , 'error');      
    });
  }

  cambiarImagen( file ) {
    
    this.imagenSubir = file;
    
    if ( !file ) {
      return this.imgTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this._fileUploadService.updateFoto( this.imagenSubir, 'usuarios', this.usuario.id ).then( img => {
      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen de usuario fue actualizada', 'success');
    }, ( err ) => {
      Swal.fire('Guardado', 'No se puedo subir la imagen', 'error');
      console.log(err);
    });
  }
}
