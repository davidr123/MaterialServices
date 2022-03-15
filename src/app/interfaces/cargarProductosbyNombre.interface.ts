import { Producto } from "../models/producto.models";

export interface CargarProductobyNombre{
    ok:boolean,
    productos:Producto[]
  
  }