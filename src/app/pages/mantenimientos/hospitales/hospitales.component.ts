import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/back/models/hospital.model';
import { BusquedaService } from 'src/app/back/services/busqueda.service';
import { HospitalService } from 'src/app/back/services/hospital.service';
import { ModalImagenService } from 'src/app/back/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.less']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  imgSub: Subscription;


  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
    private _busquedaService: BusquedaService
  ) { }
  

  ngOnInit(): void {
    this.cargando = true;
    this.listarHospitales();

    this.imgSub = this._modalImagenService.nuevaImagen
    .pipe( delay(100))
    .subscribe( img => this.listarHospitales() )
  }

  listarHospitales() {
    this._hospitalService.listHospitales().subscribe( resp => {
      this.cargando = false;
      this.hospitales = resp;
    });
  }

  save(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital._id, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  delete( hospital: Hospital ) {
    this._hospitalService.deleteteHospital(hospital._id).subscribe(resp => {
      Swal.fire('Borrado', hospital.nombre, 'success');
      this.removeItemData( hospital );
    });
  }

 async showSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospita',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    })

    if( value.trim().length > 0 ) {
      this._hospitalService.createHospital( value ).subscribe( ( resp: any )=> {
        this.hospitales.push( resp.hospital )
      })
    }
  }

  abrirModal( hospital: Hospital ) {
    this._modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img );
  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
      this.listarHospitales();
      return this.listarHospitales();
    }

    this._busquedaService.buscar('hospitales', termino).subscribe( ( resp: Hospital[] ) => {
      this.hospitales =  resp;
    })
  }

  private removeItemData( item: Hospital ) {
    let i = this.hospitales.indexOf( item );
    if ( i !== -1 ) {
      this.hospitales.splice(i, 1);
    }
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

}
