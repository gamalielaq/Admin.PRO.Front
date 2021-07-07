import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../back/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
constructor(
  private _usuarioService : UsuarioService,
  private _router: Router
) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this._usuarioService.validarToken().pipe(
        tap( resp => {
          if( !resp ) {
              this._router.navigateByUrl('/login')
          }
        })
      );
  }

  // canLoad --> Solo vamoa a cargar las rutas si tine acceso
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._usuarioService.validarToken().pipe(
      tap( resp => {
        if( !resp ) {
            this._router.navigateByUrl('/login')
        }
      })
    );
  }  
}