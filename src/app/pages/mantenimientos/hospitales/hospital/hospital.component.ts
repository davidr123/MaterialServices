import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Usuario } from 'src/app/models/usuario.models';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

public usuarios: Usuario[]=[]

public usuarioSeleccionado: Usuario | undefined;

public hospitalSeleccionado!: Hospital ;

  public FormHospital!:FormGroup;
  constructor(private fb:FormBuilder, private usuarioServices:UsuarioService, private hospitalServices:HospitalesService,
    private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {


this.activatedRoute.params
.subscribe(({id})=>this.ObtenerHospitalById(id))


    this.FormHospital=this.fb.group({
      nombre:['', Validators.required],
      usuario:['', Validators.required]
      })

      this.CargarUsuario();

      this.FormHospital.get('usuario')?.valueChanges
      .subscribe(usuarioId=>{
        console.log(usuarioId)

        this.usuarioSeleccionado= this.usuarios.find(usu=> usu.uid === usuarioId)
        console.log(this.usuarioSeleccionado)
      })
  }


  CargarUsuario(){
    this.usuarioServices.cargarusuario().
subscribe(resp=>{
  console.log(resp);
  this.usuarios= resp.usuarios;
})
  }


  CrearHospital(){

    const {nombre}= this.FormHospital.value;
    if(this.hospitalSeleccionado){
//ACTUALIZAR
      this.hospitalServices.actualizarHospitales(this.hospitalSeleccionado, this.FormHospital.get('nombre')?.value)
      .subscribe(resp=>{
        Swal.fire('Actualizado', `${nombre} a sido actualizado con éxito`, 'success')
        this.route.navigateByUrl('dashboard/hospitales')
        console.log(resp)
      })
    }else{

      //CREAR
      this.hospitalServices.crearhospital(this.FormHospital.get('nombre')?.value)
      .subscribe(resp=>{
        console.log(resp);
        Swal.fire('Nuevo', `${nombre} a sido creado con éxito`, 'success')
        this.route.navigateByUrl('dashboard/hospitales')

      })
    }

  

  }

  ObtenerHospitalById(id:string){

    if(id==='nuevo'){
      return;
    }

   this.hospitalServices.mostrarhospitalesbyid(id)
   .subscribe(resp=>{
     console.log(resp)

     if(!resp){
       return
     }

     this.hospitalSeleccionado= resp;
     const {nombre, usuario}= resp;
     this.FormHospital.setValue({nombre, usuario})
   })
  }


}
