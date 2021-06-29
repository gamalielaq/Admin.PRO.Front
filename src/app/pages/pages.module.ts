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
