import { Producto } from "../models/producto.models";

export interface CargarUsuarioPedido{

  nombre:string,
 apellido:string,
 identificacion:string,
 email:string,
 genero:string,
  direccion:string,
  producto:Producto[]

}