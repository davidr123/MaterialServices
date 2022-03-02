import { Hospital } from "./hospital.models";

export interface Usuario_Medico{
    _id:string;
    nombre:string;
    img:string

}


export class Medico{

  constructor(
 public   nombre:string,
 public   _id:string,
 public   img:string,
 public   usuario:Usuario_Medico,
 public   hospitales:Hospital


  ){

  }


}