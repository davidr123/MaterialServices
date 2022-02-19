import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public formPerfil!: FormGroup;
  public usuario!: Usuario;

  constructor(private fb: FormBuilder, private usaurioServices: UsuarioService) { 
   
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
 console.log(resp);

})
  }

}
