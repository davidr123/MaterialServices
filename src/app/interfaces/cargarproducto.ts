import { Producto } from "../models/producto.models";
import { Usuario } from "../models/usuario.models";

export interface CargarProducto{
  total:number,
  producto:Producto[]

}