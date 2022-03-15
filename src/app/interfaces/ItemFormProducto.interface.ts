import { Producto } from "../models/producto.models"

export interface ItemFormProducto{
 _id:string,        
 descripcion:string,
 codigo:string,
 cantidad:number,
 precio:number
 productos:Producto;
}