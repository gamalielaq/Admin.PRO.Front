import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../back/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this._usuarioService.rol === 'ADMIN-ROL') {
      return true;
    } else {
      this._router.navigateByUrl('/dashboard')
      return false;
    }
    // return (this._usuarioService.rol === 'ADMIN-ROL')? true : false;
  }

}
