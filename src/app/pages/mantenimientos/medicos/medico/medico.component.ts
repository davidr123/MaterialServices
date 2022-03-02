import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalimagenComponent } from 'src/app/components/modalimagen/modalimagen.component';

import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';

import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalimagenService } from 'src/app/services/modalimagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;

  public hospitales: Hospital[]=[];

  public hospitalseleccionado: Hospital | undefined   ;
  public medicoseleccionado: Medico | undefined  ;

  constructor(private fb:FormBuilder, private hospitalServices: HospitalesService
    , private medicoServices: MedicoService,
    private activateRoute: ActivatedRoute, private route: Router, public dialog: MatDialog,
    private modalServices:ModalimagenService) { }



  ngOnInit(): void {

    this.activateRoute.params.subscribe(resp=>
      console.log(resp))

this.activateRoute.params.subscribe(({id})=>{
  this.CargarMedico(id)
})

this.modalServices.cambioImagen.pipe(
  delay(100)
).subscribe(resp=>{
  this.activateRoute.params.subscribe(({id})=>{
    this.CargarMedico(id)
  })

})

this.medicoForm= this.fb.group({
  nombre:['', Validators.required],
  hospitales:['', Validators.required]
});

this.CargarHospitales();


this.medicoForm.get('hospitales')?.valueChanges
.subscribe(hospitalID=>{
  console.log(hospitalID)

  this.hospitalseleccionado= this.hospitales.find(h=> h._id=== hospitalID)
  
  
}
)

  }


  CargarMedico(id:string){


    if(id==='nuevo'){
      return;
    }

    this.medicoServices.ObtenerMedicoId(id)
    .pipe(
      delay(100)
    ).
    subscribe(medico=>{

      if(!medico){
       
        this.route.navigateByUrl(`/dashboard/medicos`) 
      }

      console.log(medico)
      const {nombre, hospitales:{_id}}= medico;
      console.log(nombre, _id);
      this.medicoseleccionado=medico;
      this.medicoForm.setValue({nombre, hospitales:_id});
    })
  }

  CargarHospitales(){
this.hospitalServices.mostrarhospitales()
.subscribe(resp=>{
  console.log(resp)
this.hospitales= resp.hospitalDB
})
  }

 CrearMedico(){
    console.log(this.medicoForm.value);

    const {nombre}= this.medicoForm.value;

    if(this.medicoseleccionado){

      const data= {
        ...this.medicoForm.value,
      _id: this.medicoseleccionado._id}

      this.medicoServices.actualizarmedico(data)
      .subscribe(resp=>{
        console.log(resp)
        Swal.fire('Actualizado', `${nombre} a sido actualizado`, 'success')
      })

    }else{
      //crear
      this.medicoServices.crearmedico(this.medicoForm.value)
.subscribe((resp:any)=>{
  console.log(resp)
  Swal.fire('Creado', 'El medico a sido creado con exito', 'success');
  this.route.navigateByUrl(`/dashboard/medicos`)
  
  //this.onNoClick();
})
    }


  }


  openDialog(medico:Medico): void {
    console.log(medico)
    const dialogRef = this.dialog.open(ModalimagenComponent, {
data: this.modalServices.abririmagen('medicos', medico._id, medico.img)
    });

    dialogRef.afterClosed().subscribe(result => {
   
      
    });
  }


  /*
  onNoClick(): void {
    this.dialogRef.close();
  }
*/
}
