import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarMedicos } from '../interfaces/cargarMedicos';
import { Medico } from '../models/medico.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }


  constructor(private http:HttpClient) { }

  cargarmedico(){
    const url=`${base_url}/medicos`;
    return this.http.get<CargarMedicos>(url, this.headers ).pipe(
      map(resp=>{
        const medicosDB= resp.medicosDB.map( med=>new Medico(med.nombre, med._id, med.img, med.usuario, med.hospitales)
        );
return{
  ok:resp.ok,
  medicosDB
}
     
      })
      
    )

  }

  crearmedico(medico:{nombre:string, hospital:string}){
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);

  }


  ObtenerMedicoId(id: string){
    
  
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp: {ok:boolean, medicosDB:Medico})=> resp.medicosDB)
    )
  
  }


  borrarmedico(id:string, nombre:string){

const url = `${base_url}/medicos/${id}`;

return this.http.delete(url, this.headers )
  }


  actualizarmedico(medico:Medico){

const url = `${base_url}/medicos/${medico._id}`;
return this.http.put(url, medico, this.headers);

  }

}
