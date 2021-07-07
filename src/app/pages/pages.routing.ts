import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';



const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad: [ AuthGuard ],
        loadChildren: () => import('./child-routs.module').then( m => m.ChildRoutsModule)
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
