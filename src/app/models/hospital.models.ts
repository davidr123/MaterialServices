export class HospitalUsuario{

   constructor(
       public _id:string,
       public nombre:string,
       public img:string

   ){

   }

}


export class Hospital{


  
    constructor(

        
            public _id:string,
            public nombre:string,
            public usuario?:HospitalUsuario,
            public img?:string,
       

    ){}

}