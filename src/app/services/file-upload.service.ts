import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public usuario!:Usuario;

  get token():string{

    return localStorage.getItem('token') || '';

  }

  get headers(){

  return {headers:{

    'x-token':this.token

  }}

  }

  get uid():string{
    return this.usuario.uid || '';
  }

  

  constructor(private http: HttpClient) { }


  actualizarfoto(
    id:string,
    tipo:'usuarios'| 'medicos' | 'hospitales',
    img:string
  ){
   // http://localhost:3005/api/upload/hospitales/3cafb136-af9c-412b-b3a1-cfcabd78050d.jpg

 
  }


  


}
