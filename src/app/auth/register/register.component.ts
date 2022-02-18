
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public FormSubmit= false;

 public FormRegister= this.fb.group({
nombre:['', Validators.required],
email:['', [Validators.required, Validators.email]],
password:['', Validators.required],
password2:['', Validators.required]


 }, {

  validators: this.PasswordIgules('password', 'password2')
   
 });

  constructor(private usuarioService: UsuarioService, public fb: FormBuilder, private route: Router) {}

  

  ngOnInit(): void {
  }

  CrearUsuarios(){
    this.FormSubmit= true;
    if(this.FormRegister.invalid){
      return;
    }
     
    this.usuarioService.crearusuario(this.FormRegister.value)
    .subscribe(resp=>{
      console.log(resp);
      this.route.navigateByUrl('/menu');
    Swal.fire('Creado', 'El usuario a sido creado con éxito', 'success')

    })
  }

  CampoNoValido(campo: string): boolean{

    if(this.FormRegister.get(campo)?.invalid && this.FormSubmit){
return true;
    }else{
      return false;
    }

  }


  ContrsenasIguales(){

    const pass1= this.FormRegister.get('password1')?.value;
    const pass2= this.FormRegister.get('password2')?.value;

   if((pass1 !== pass2) && this.FormSubmit){
      return true;
    }else{
     return false;
    }
  }

  PasswordIgules(passName1: string, passName2:string){

  return (formGroup: FormGroup)=>{

    const controlpass1= formGroup.get(passName1);
    const controlpass2= formGroup.get(passName2);

    if(controlpass1?.value ===controlpass2?.value){
      controlpass2?.setErrors(null)
    }else{
      controlpass2?.setErrors({noesIgual:true})
    }
  }

  }

}
