import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalimagenComponent } from 'src/app/components/modalimagen/modalimagen.component';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalimagenService } from 'src/app/services/modalimagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public cargando: boolean = true;

  ELEMENT_DATA: Hospital[]=[];
  displayedColumns: string[] = ['avatar', 'nombre', 'acciones'];

  public hospital:Hospital[]=[];
  public hospitales!:Hospital;

  public ok:boolean=true;

  public subs!:Subscription;

  


  dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private hospitalServives:HospitalesService
    , private modalServices:ModalimagenService) { }

  ngOnInit(): void {
this.MostrarHospitales();
this.subs=  this.modalServices.cambioImagen.pipe(
  delay(100)
).subscribe(resp=>{
  console.log(resp)
  this.MostrarHospitales();
})




  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(hospital:Hospital): void {
    console.log(hospital)
    const dialogRef = this.dialog.open(ModalimagenComponent, {
data: this.modalServices.abririmagen('hospitales', hospital._id, hospital.nombre)
    });

    dialogRef.afterClosed().subscribe(result => {
   
      
    });
  }

  MostrarHospitales(){
    this.hospitalServives.mostrarhospitales()
    .subscribe(hospitalDB=>{

      this.hospital=hospitalDB.hospitalDB;
      this.dataSource.data=this.hospital;
      console.log(this.hospital)
      this.cargando=false;
    })

  }

 async CrearHospital(){

    const { value='' }= await Swal.fire<string>({
      title:'CREAR HOSPITALES',
     
     text:'Ingrese el  nombre del nuevo hospital',
     input: 'text',
      inputPlaceholder: 'Ingresar nombre del hospital',
      showCancelButton:true
    })
    
    if(value?.trim().length > 0){
      this.hospitalServives.crearhospital(value).subscribe(
        (resp:any)=>{

          this.hospital.push(resp.hospitalDB)

          this.MostrarHospitales()
          console.log(this.hospital);
        }
      )
    }
    
    console.log(value)


  
  }

  BorrarHospital(hospital:Hospital){
this.hospitalServives.borrarhospital(hospital._id).
subscribe(resp=> {
  Swal.fire('Borrar', `Esta seguro de eliminar a ${hospital.nombre}`, 'success');
 this.MostrarHospitales();


})
  }
/*
  ActualizarHospital(hospital:Hospital){

    this.hospitalServives.actualizarHospitales(hospital._id, hospital.nombre)
    .subscribe(resp=>{
      console.log(resp);
      Swal.fire('Actualizado', `el hospital a sido actualuzado`, 'success');
    });

  }

*/


}
