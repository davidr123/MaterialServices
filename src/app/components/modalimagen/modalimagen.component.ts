import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalimagenService } from 'src/app/services/modalimagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalimagen',
  templateUrl: './modalimagen.component.html',
  styles: [
  ]
})
export class ModalimagenComponent implements OnInit {

  public imagenSubir!: File;

  public imgTemp:any;
  public usuario!: Usuario;

  constructor( public dialogRef: MatDialogRef<ModalimagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario, public modalImgenService: ModalimagenService,
   private fileUploadService: FileUploadService) { 


   }

  ngOnInit(): void {


  }


   onNoClick(): void {
    this.dialogRef.close();
  }
  cambiarImagen(file:File): any{
    console.log( file);
    this.imagenSubir= file;

    if(!file){
      return this.imgTemp = null ;
    }

    const reader= new FileReader();
   const url64= reader.readAsDataURL(file);

   reader.onloadend=()=>{
     this.imgTemp= reader.result;
   }

   
  }

  ActualizarImagenUsuario(){

    const id= this.modalImgenService.id;
    const tipo= this.modalImgenService.tipo;

    this.fileUploadService.actualizarfotoperfil(this.imagenSubir, tipo, id)
    .then(resp=> {
     console.log(resp)
   //this.usuario.img=resp
     Swal.fire('Actualizado', 'imagen de usuario actualizada', 'success');
    this.modalImgenService.cambioImagen.emit(resp);
     
     
     
     
    }, (err)=>{
      Swal.fire('Error', err.error.msg, 'error');
    })
 
    
    
  }
 


}
