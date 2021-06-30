import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Principal',
      icon:'mdi mdi-gauge',
      subMenu:[
        { title: 'Dashboard' , url: '/'},
        { title: 'Progresbar' , url: 'progress'},
        { title: 'Graficas' , url: 'grafica1'},
        { title: 'Promesas' , url: 'promess'},
        { title: 'rxjs' , url: 'rxjs'}
      ]
    },
    {
      title: 'Mantenimiento',
      icon:'mdi mdi-folder-lock-open',
      subMenu:[
        { title: 'Usuarios' , url: 'usuarios'},
        { title: 'Hospitales' , url: 'hospitales'},
        { title: 'Medicos' , url: 'medicos'},
      ]
    }

  ]

  constructor() { }
}
