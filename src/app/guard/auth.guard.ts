
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService, private route: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      console.log('paso por el guard');

    return this.usuarioService.validartoken()
    .pipe(
      tap( Autenticado=>{
        if(!Autenticado){
          this.route.navigateByUrl('login');
        }
      })
    );
    
  }
  
}
