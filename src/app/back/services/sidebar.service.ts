import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [];

  constructor() { 
  }

  listMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
