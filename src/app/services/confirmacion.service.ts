import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {


  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }

  EnviarArrayaInformacion:EventEmitter<Producto[]>= new EventEmitter<Producto[]>();

  constructor() { }
}
