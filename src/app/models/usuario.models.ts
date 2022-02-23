import { environment } from "src/environments/environment";
const base_url= environment.base_url;

export class Usuario{
    map(arg0: (usu: any) => void) {
      throw new Error('Method not implemented.');
    }

    

    constructor(
        public nombre:string,
        public email:string,
        public img:string,
        public role:'ADMIN_ROLE' | 'USER_ROLE',
        public uid:string
     ){}
  
    get imagenUrl(){

        if(!this.img){
            return `${base_url}/upload/usuarios/no-image`;
        }else if(this.img){
       return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`;
        }


    }

}