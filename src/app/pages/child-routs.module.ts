import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgresComponent } from './progres/progres.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SettingsComponent } from './settings/settings.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const childRouts: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
  { path: 'progress', component: ProgresComponent, data: { title: 'progressBar' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Configuración' } },
  { path: 'buscar/:termino', component: BusquedasComponent, data: { title: 'Busquedas' } },
  { path: 'promess', component: PromesasComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs  ' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario' } },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Manteniemiento de Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimientos de Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimientos de Medicos' } },

  //Rutas de admnin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Mantenimiento de Usuarios' } },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRouts)
  ],
  exports: [RouterModule]
})
export class ChildRoutsModule { }
