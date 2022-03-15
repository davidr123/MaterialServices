import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarProducto } from '../interfaces/cargarproducto';
import { CargarProductobyNombre } from '../interfaces/cargarProductosbyNombre.interface';
import { Producto } from '../models/producto.models';
const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  get token(){
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {headers:{

      'x-token': this.token
    }}
  }

 public cambioArray:EventEmitter<Producto[]>= new EventEmitter<Producto[]>();

 EnviarArrayaInformacion:EventEmitter<Producto[]>= new EventEmitter<Producto[]>();



  constructor(private http:HttpClient) { }


  getproductosbyNombre(descripcion:string){

    //http://localhost:3005/api/todo/productos/refr

      const url = `${base_url}/todo/productos/${descripcion}`;
      return this.http.get<CargarProductobyNombre>(url, this.headers).
      pipe(
        map((resp:{ok:boolean, productos:Producto[]})=>resp.productos)
      )
  
  }

  getproductobyid(id:string){
    const url = `${base_url}/productos/${id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok:boolean, productosDB:Producto})=>resp.productosDB)
    )
  }


  crearproducto(producto:{descripcion:string, codigo:string, cantidad:number, precio:number}){
    const url = `${base_url}/productos/`;

    return this.http.post(url, producto, this.headers)

  }


  borrarproducto(id:string){
    const url = `${base_url}/productos/${id}`;
    return this.http.delete(url, this.headers);
  }


  getprod(){
    const url = `${base_url}/productos`;
    return this.http.get<CargarProductobyNombre>(url, this.headers)
    .pipe(
      map((resp:{ok:boolean, productos:Producto[]})=> resp.productos)
    );

  }

}
