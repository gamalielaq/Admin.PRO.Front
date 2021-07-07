import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/back/models/hospital.model';
import { Medico } from 'src/app/back/models/medico.model';
import { Usuario } from 'src/app/back/models/usuario.model';
import { BusquedaService } from 'src/app/back/services/busqueda.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.less']
})
export class BusquedasComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private _activatedRoute :ActivatedRoute,
    private _busquedaService :BusquedaService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const termino = this._activatedRoute.params.subscribe(({ termino }) => this.buscar( termino ));
  }


  buscar( termino: string ) {
    this._busquedaService.busquedaGlobal( termino ).subscribe( ( resp : any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    })
  }

  abrirMedico( medico: Medico ) {
    this._router.navigate(['/dashboard/medico', medico._id ])
  }
}
