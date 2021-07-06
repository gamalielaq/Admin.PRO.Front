import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgresComponent } from './progres/progres.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SettingsComponent } from './settings/settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';

@NgModule({
  declarations: [
    ProgresComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    SettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
  ],
  imports: [ 
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule, 
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProgresComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    SettingsComponent
  ]
 
})
export class PagesModule { }
