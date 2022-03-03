import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { UsuarioService } from '../services/usuario.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  //providers: [MediaMatcher]
})
export class PagesComponent implements OnInit {

  

  
public imgUrl= '';
public usuario!: Usuario;



 
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: Router, public usuarioService: UsuarioService, 
    private fileUploadServices: FileUploadService
    ) { 


this.imgUrl= usuarioService.usuario.imagenUrl;
this.usuario= usuarioService.usuario;

console.log(this.imgUrl);

     
    }
  ngOnInit(): void {
   

  }

  

    Logout(){
      this.route.navigateByUrl('login');
      localStorage.removeItem('token');
    }

    BuscarTodo(termino:string){

      if(termino.length===0){
        return;
      }

  this.route.navigateByUrl(`/dashboard/buscar/${termino}`)

    }

 

}
