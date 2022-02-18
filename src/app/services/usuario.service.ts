import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterInterface } from '../interfaces/register.interface';
import {catchError, map, tap} from 'rxjs/operators';
import { LoginInterface } from '../interfaces/login.interface';
import { Observable, of } from 'rxjs';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  get token(){

    return localStorage.getItem('token') || '';

  }

  get headers(){

  return {headers:{

    'x-token':this.token

  }}

  }

  constructor(private http: HttpClient) { }

validartoken(): Observable<boolean>{
  const url= `${base_url}/login/renew`;

  return this.http.post(url, this.headers).
  pipe(
    tap((resp:any)=>{
      localStorage.setItem('token', resp.token);
    } ),
    map(resp=> true),
    
    catchError(err=> of(false))
  );
  

}



  loginusuario(data:LoginInterface){

    //https://localhost:3005/api/login

    const url= `${base_url}/login`;

    return this.http.post(url, data).
    pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      })
    );

  }

  crearusuario(data:RegisterInterface){
    //http://localhost:3005/api/usuarios

    const url= `${base_url}/usuarios`;

    return this.http.post(url, data)
    .pipe(
      map((resp:any)=>{;
        localStorage.setItem('token', resp.token);
        console.log(resp);
      })
    )

  }




}
