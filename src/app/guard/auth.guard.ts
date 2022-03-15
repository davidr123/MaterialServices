
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, Routes, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private usuarioService: UsuarioService, private route: Router ){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validartoken()
    .pipe(
      tap( Autenticado=>{
        if(!Autenticado){
          this.route.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

     

    return this.usuarioService.validartoken()
    .pipe(
      tap( Autenticado=>{
        if(!Autenticado){
          this.route.navigateByUrl('/login');
        }
      })
    );
    
  }
  
}
