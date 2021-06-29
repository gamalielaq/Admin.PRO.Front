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
    }

  ]

  constructor() { }
}
