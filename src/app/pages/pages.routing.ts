import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgresComponent } from './progres/progres.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SettingsComponent } from './settings/settings.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: {title:'Dashboard'} },
          { path: 'grafica1', component: Grafica1Component, data: {title:'Grafica #1'}  },
          { path: 'progress', component: ProgresComponent, data: {title:'progressBar'}  },
          { path: 'settings', component: SettingsComponent, data: {title:'Configuración'}  },
          { path: 'promess', component: PromesasComponent, data: {title:'Promesas'}  },
          { path: 'rxjs', component: RxjsComponent, data: {title:'RxJs  '} },
          { path: 'perfil', component: PerfilComponent, data: {title:'Perfil de Usuario'} },

          //Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data: {title:'Usuarios de aplicaión'} }
        ]
      }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
