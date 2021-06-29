import { ThrowStmt } from '@angular/compiler';
import { Component, Input, EventEmitter , Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.less']
})
export class IncrementadorComponent  {
  
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary';
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  
  cambiarValor( valor: number ) {
    if( this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso =  100;  
    }
    if( this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso =  0;  
    }

    this.valorSalida.emit(this.progreso + valor);
    this.progreso =  this.progreso + valor;
  }

  onChange( value: number ) {
    
    if( value >= 100) {
      this.progreso = 100;
    } else if ( value <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = value;
    }

    this.valorSalida.emit(this.progreso);
    
  }

}
