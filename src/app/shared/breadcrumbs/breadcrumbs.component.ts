import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string;
  public tituloSubs$: Subscription;

  constructor(
    private router: Router
  ) {
    this.tituloSubs$ = this.geDataRuta().subscribe(({ title }) => {
      this.titulo = title;
      document.title = `Admin Pro - ${title}`
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  geDataRuta() {
    return this.router.events.pipe(
      filter(evet => evet instanceof ActivationEnd),
      filter((evet: ActivationEnd) => evet.snapshot.firstChild === null),
      map((evet: ActivationEnd) => evet.snapshot.data)
    );
  }

}
