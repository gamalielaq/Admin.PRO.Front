import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/back/models/medico.model';
import { BusquedaService } from 'src/app/back/services/busqueda.service';
import { MedicoService } from 'src/app/back/services/medico.service';
import { ModalImagenService } from 'src/app/back/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.less']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  imgSub: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _modalImagenService: ModalImagenService,
    private _busquedaService: BusquedaService
  ) { }
 
  ngOnInit(): void {
    this.cargando = true;
    this.listarMedico();

    this.imgSub = this._modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.listarMedico())

  }

  listarMedico() {
    this._medicoService.listMedicos().subscribe(resp => {
      this.cargando = false;
      this.medicos = resp;
    })
  }

  abrirModal(medico: Medico) {
    this._modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.listarMedico();
    }
    this._busquedaService.buscar('medicos', termino).subscribe(resp => {
      this.medicos = resp;
    })
  }

  delete( medico:Medico ) {
    
    Swal.fire({
      title: 'Borrar usuario',
      text: "Esta seguro de realizar esta operación?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicoService.deleteteMedico( medico._id ).subscribe( resp => {
          this.listarMedico();
          Swal.fire('Usuario borrado', 'Elmininado correctamente', 'success')
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

}