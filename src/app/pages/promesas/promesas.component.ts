import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.less']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios=> {
      console.log(usuarios);
    });

    const promesa = new Promise( ( resolve, reject )=> {  
      
      if( false ) {
        resolve('hola mundo');
      }else {
        reject('Algo salio mal')
      }
      
    });

    promesa.then( (msg) => {
      console.log(msg);
    }).catch ( err => {
      console.log('error en mi promera: '+ err);
    })
  }

  getUsuarios() {
    return new Promise ( resolve=> {
      fetch('https://reqres.in/api/users')
      .then( res => res.json() )
      .then( body => console.log( body.data ));
    })
  }

}
