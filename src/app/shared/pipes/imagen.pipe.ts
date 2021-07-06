import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios' | 'hospitales' | 'medicos' ) {
    if ( !img ) {
      return `${baseUrl}/upload/usuarios/no-image`;
    }
    if ( img.includes('https' )) {
      return img;
    }
    if ( img ) {
      return `${baseUrl}/upload/${ tipo }/${ img }`;
    } else {
      return `${baseUrl}/upload/usuarios/no-image`;
    }
  }

}