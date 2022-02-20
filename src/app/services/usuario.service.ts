import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterInterface } from '../interfaces/register.interface';
import {catchError, delay, map, tap} from 'rxjs/operators';
import { LoginInterface } from '../interfaces/login.interface';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { CargarUsuario } from '../interfaces/cargarusuario.interface';


const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario

  get token(){

    return localStorage.getItem('token') || '';

  }

  get headers(){

  return {headers:{

    'x-token':this.token

  }}

  }

  get uid(){
   return this.usuario.uid
  }


  constructor(private http: HttpClient) { }

validartoken(): Observable<boolean>{
  const url= `${base_url}/login/renew`;

  return this.http.get(url, this.headers).
  pipe(
    map((resp:any)=>{

      const {   
         nombre,
         email,
         img,
       
         role,
         uid,
        }= resp.usuario

      this.usuario = new Usuario( nombre, email, img, role,uid,);

      localStorage.setItem('token', resp.token);
      return true;
    } ),
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


  actualizarUsuario(data:{nombre:string, email: string, role:string}){
    //http://localhost:3005/api/usuarios/61d23b1becb11e35555ad9db
data={
  ... data,
  role:this.usuario.role || ''
}
  
    const url=`${base_url}/usuarios/${this.uid}`;
     return this.http.put(url, data, this.headers);
  }

  cargarusuario(){

    //http://localhost:3005/api/usuarios
    const url = `${base_url}/usuarios`
   return this.http.get<CargarUsuario>(url, this.headers).
   pipe(
     map(resp=>{  
      const usuarios= resp.usuarios.map(
        usu=> new Usuario(usu.nombre, usu.email, usu.img, usu.role, usu.uid)
        );

        return{
          total: resp.total,
          usuarios
        }
     })
   
     
   )
  }




}
