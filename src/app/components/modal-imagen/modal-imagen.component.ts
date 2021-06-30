import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileUploadService } from 'src/app/back/services/file-upload.service';
import { ModalImagenService } from 'src/app/back/services/modal-imagen.service';
import { UsuarioService } from 'src/app/back/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.less']
})
export class ModalImagenComponent implements OnInit {
  ocultarModal: boolean = false;
  imagenSubir: File;
  imgTemp: any = '';

  constructor(
      public modalImagenService: ModalImagenService,
      private _fileUploadService: FileUploadService,
      private _usuarioService: UsuarioService
  ) { 
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this._fileUploadService.updateFoto( this.imagenSubir, tipo , id ).then( img => {

      Swal.fire('Guardado', `Imagen de ${tipo} fue actualizada`, 'success');

      this.modalImagenService.nuevaImagen.emit( img );

      this.cerrarModal();
    }, ( err ) => {
      Swal.fire('Guardado', 'No se puedo subir la imagen', 'error');
      console.log(err);
    });
  }
}
