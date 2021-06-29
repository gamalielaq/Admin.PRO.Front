import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit, OnDestroy{

  public intervalSub: Subscription

  constructor() {
    
    this.intervalSub = this.retornaIntervalo().subscribe( console.log ) ;

    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('subs', valor),
    //   ( err ) => console.warn('Error', err),
    //   ()=> console.info('Obs Terminado')
    //   );

  }
 
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      take(4), 
      map( valor => valor + 1 ),
      filter( valor => (valor%2 === 0)? true : false ) 
    )
  }

  retornaObservable(): Observable<number> {

    let i = -1;

    const obs$ = new Observable<number>(observer => {


      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if( i == 2) {
          observer.error('i llego al valor de 2');
        }

      }, 1000)

    });
    return obs$;
  }

}
