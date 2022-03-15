import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargarusuario.interface';

import { Usuario } from '../models/usuario.models';
import { UsuarioPedido } from '../models/usuariopedido.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DatosusuarioService {

  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }


  constructor(private http:HttpClient) { }

obtenerusuariobynombre(nombre:string){
  //http://localhost:3005/api/usuarios/llorente
  const url= `${base_url}/usuarios/${nombre}`;
 
  return this.http.get<CargarUsuario>(url, this.headers)
  .pipe(
    map((resp:{total:number, usuarios:Usuario[]})=> resp.usuarios)
  )

  
 

}



crearusuariopedido(data:{nombre:string, apellido:string, identificacion:string, email:string, genero:string,
direccion:string}){
  const url=`${base_url}/usuariospedido`;
  return this.http.post(url, data, this.headers);

}


}
