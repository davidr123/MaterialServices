import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalimagenService {

  get token(){

    return localStorage.getItem('token') || '';

  }

  get headers(){

  return {headers:{

    'x-token':this.token

  }}

  }

 public tipo!: 'usuarios'|'medicos'|'hospitales';
 public id!:string;
 public img: string='no-img';

 public cambioImagen: EventEmitter<string>= new EventEmitter<string>();

  constructor(private http: HttpClient) { }


abririmagen(
  tipo:'usuarios'|'medicos'|'hospitales',
  id:string,
  img: string 
){

  this.tipo= tipo;
  this.id= id;
  this.img= img;

  //http://localhost:3005/api/upload/usuarios/6bb53f6d-22fc-4ef8-8149-1f29d60bd1bfa.jpg


  if(img){
    this.img= `${base_url}/upload/${tipo}/${img}`;
   
  }else{
    this.img= `${base_url}/upload/${tipo}/no-img`;
  }
 
}

}
