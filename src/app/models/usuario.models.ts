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
      
        //http://localhost:3005/api/upload/usuarios/6bb53f6d-22fc-4ef8-8149-1f29d60bd1bfa.jpg
        if(this.img){
       return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`;
        }


    }

}