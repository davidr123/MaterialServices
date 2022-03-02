import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarHospitales } from '../interfaces/cargarHospitales';
import { Hospital } from '../models/hospital.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }

  constructor(private http:HttpClient) { }


  mostrarhospitales(){
    //http://localhost:3005/api/hospitales

    const url=`${base_url}/hospitales`;

    return this.http.get<CargarHospitales>(url, this.headers).
    pipe(
      map(resp=>{
        const hospitalDB= resp.hospitalDB.map(hosp=>new Hospital(hosp._id, hosp.nombre, hosp.usuario, hosp.img)
        );

        return{
          ok:resp.ok,
          hospitalDB

        }
      }

      )
    )


  }


  crearhospital(nombre:string){
    //http://localhost:3005/api/hospitales
    const url =`${base_url}/hospitales`;
    return this.http.post<CargarHospitales>(url, {nombre},this.headers,)
  }


  borrarhospital(id:string){
    const url= `${base_url}/hospitales/${id}`;
    return this.http.delete(url, this.headers );


  }

  actualizarHospitales(_id:string, nombre:string){
    const url= `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers );


  }

  

 


}
