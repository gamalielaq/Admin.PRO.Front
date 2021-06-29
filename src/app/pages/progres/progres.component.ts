import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progres',
  templateUrl: './progres.component.html',
  styleUrls: ['./progres.component.less']
})
export class ProgresComponent {

  progreso1: number = 25;
  progreso2: number = 35;

  get getProgreso1() {
    return `${this.progreso1}%`
  }
  get getProgreso2() {
    return `${this.progreso2}%`
  }

  changeValue( value: number ) {
    
  }

}
