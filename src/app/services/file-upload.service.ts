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


  async actualizarfotoperfil(archivo: File, tipo:
    'usuarios'|'medicos'|'hospitales', id:string
  ){


try {
  const url= `${base_url}/upload/${tipo}/${id}`
  const formaData= new FormData();
  formaData.append('imagen', archivo);

  const resp= await fetch(url, {
    method:'PUT',
    headers:{
      'x-token': localStorage.getItem('token') || ''
    },
   body:formaData
  });

const data= await resp.json();

if(data.ok){
  console.log(data)
return data.nombreArchivo;
}else{
  console.log(data.msg);
  return false
}
  
} catch (error) {
  console.log(error);
  return false;
}
   
  }

  


}
