import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http:HttpClient) { }

  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }



  busquedaglobal(termino:string){

    const url =`${base_url}/todo/${termino}`;
 return  this.http.get(url, this.headers);
  }
}
