import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/back/models/hospital.model';
import { Medico } from 'src/app/back/models/medico.model';
import { HospitalService } from 'src/app/back/services/hospital.service';
import { MedicoService } from 'src/app/back/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.less']
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  hospitales: Hospital[];
  selectedHospital: Hospital;
  selectedMedico: Medico;

  constructor(
    private fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(({ id }) => this.listMedicoById(id));

    this.listHospitales();

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.selectedHospital = this.hospitales.find(x => x._id == hospitalId);
    })
  }

  listMedicoById(id: string) {

    if( id === 'nuevo' ) return;

    this._medicoService.getMedicoById(id)
    .pipe( delay( 100 )) 
    .subscribe(medico => {

      if( !medico ) {
        this._router.navigateByUrl(`/dashboard/medicos`);
        return;
      }

      const { nombre, hospital: { _id } } = medico;
      this.selectedMedico = medico;
      this.medicoForm.setValue({ nombre: nombre, hospital: _id })
    })
  }

  save() {
    const { nombre } = this.medicoForm.value;

    if (!this.selectedMedico) { //Crear
      this._medicoService.createMedico(this.medicoForm.value).subscribe((resp: any) => {
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this._router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
    } else { //Actualizar

      const data = { ...this.medicoForm.value, _id: this.selectedMedico._id }

      this._medicoService.updateMedico( data ).subscribe( resp => {
        Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
      });
    }

  }

  listHospitales() {
    this._hospitalService.listHospitales().subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
    })
  }

}
