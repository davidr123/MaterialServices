import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public formPerfil!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;

  public imgTemp:any;

  constructor(private fb: FormBuilder, private usaurioServices: UsuarioService, 
    private fileUploadServices: FileUploadService) { 
   
  this.usuario= usaurioServices.usuario;
  }

  ngOnInit(): void {
    this.formPerfil= this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  ActualizarUsuario(){
this.usaurioServices.actualizarUsuario(this.formPerfil.value)
.subscribe((resp:any)=>{
  const{nombre, email}= this.formPerfil.value
 this.usuario.nombre= nombre;
 this.usuario.email= email;
 console.log(nombre)
 console.log(resp);

 Swal.fire('Guardado', 'Los cambios fueron actualizados con éxito', 'success');

}, (error)=>{
Swal.fire('Error', error.error.msg, 'error');
})
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

 ActualizarFotoPerfilUsuario(){
   this.fileUploadServices.actualizarfotoperfil(this.imagenSubir, 'usuarios', this.usuario.uid)
   .then(resp=> {
    this.usuario.img= resp
    Swal.fire('Actualizado', 'imagen de usuario actualizada', 'success');
   }, (err)=>{
     Swal.fire('Error', err.error.msg, 'error');
   })

   
   
 }

}
