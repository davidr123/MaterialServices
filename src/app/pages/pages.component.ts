import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { UsuarioService } from '../services/usuario.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [MediaMatcher]
})
export class PagesComponent implements OnInit {

  

  mobileQuery: MediaQueryList ;
public imgUrl= '';
public usuario!: Usuario;


  private _mobileQueryListener: (() => void) ;

 
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: Router, public usuarioService: UsuarioService, 
    private fileUploadServices: FileUploadService,
    ) { 

      

this.imgUrl= usuarioService.usuario.imagenUrl;
this.usuario= usuarioService.usuario;

console.log(this.imgUrl);

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }
  ngOnInit(): void {

  }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    Logout(){
      this.route.navigateByUrl('login');
      localStorage.removeItem('token');
    }

 ActualizarFotoPerfil(){
   
 }

 ActualizarUsuario(){

 }


}
