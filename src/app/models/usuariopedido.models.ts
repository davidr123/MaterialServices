import { Producto } from "./producto.models";

export class UsuarioPedido{

    constructor(
 public nombre:string,
 public apellido:string,
 public identificacion:string,
 public email:string,
 public genero:string,
 public direccion:string,
 public producto:Producto[],
        
    ){

    }
}