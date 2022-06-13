import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { ModalimagenComponent } from 'src/app/components/modalimagen/modalimagen.component';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalimagenService } from 'src/app/services/modalimagen.service';
import Swal from 'sweetalert2';
import { MedicoComponent } from './medico/medico.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {


  public cargando: boolean = true;
  displayedColumns: string[] = ['avatar', 'nombre', 'acciones'];
  ELEMENT_DATA: Medico[]=[];
  public medicos: Medico[]=[];
  public imgsubs!: Subscription;


  dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private medicoServices:MedicoService
    , private modalServices:ModalimagenService, private route: Router) { 

     
    }
  ngOnDestroy(): void {
    this.imgsubs.unsubscribe();
    
  }


  ngOnInit(): void {
    this.CargarMedicos();

 this.imgsubs=   this.modalServices.cambioImagen.pipe(
      delay(100)
      
    ).subscribe(resp=>{
      this.CargarMedicos();
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

  openDialog(medico:Medico): void {
    console.log(medico)
    const dialogRef = this.dialog.open(ModalimagenComponent, {
data: this.modalServices.abririmagen('medicos', medico._id, medico.img)
    });

    dialogRef.afterClosed().subscribe(result => {
   
      
    });
  }


CargarMedicos(){
  this.medicoServices.cargarmedico()
  .subscribe(medicosDB=>{
   
    this.medicos= medicosDB.medicosDB

    this.dataSource.data= this.medicos;
    console.log(this.medicos)
    this.cargando=false;


  })
}



openDialogNuevoMedico(): void {
   
  const dialogRef = this.dialog.open(MedicoComponent, {
data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
 
    
  });
}

BorrarMedico(medico:Medico){

  Swal.fire({
    title: 'Borrar Medico?',
    text: `Esta a punto de borrar a ${medico.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si borrarlo'
  }).then((result) => {
    if (result.value) {
 console.log(result);
 this.medicoServices.borrarmedico(medico._id, medico.nombre)
 .subscribe(medico=>{
  
   console.log(medico)
   this.CargarMedicos();
   Swal.fire('Medico Borrado',
   `medico fue eliminado con éxito`, 
   'success');
 })
  
    }
  });
 



  
}

}


