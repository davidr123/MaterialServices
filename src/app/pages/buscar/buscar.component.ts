import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'nombre'];

public usuarios:Usuario[]=[];
public medicos:Medico[]=[];  
public hospitales:Hospital[]=[];

  ELEMENT_DATA: Usuario[]=[];
  ELEMENT_DATA_MEDICO: Medico[]=[];
  ELEMENT_DATA_HOSPITAL: Hospital[]=[];

  dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  dataSourcemedico= new MatTableDataSource(this.ELEMENT_DATA_MEDICO);
  dataSourcehsopitales= new MatTableDataSource(this.ELEMENT_DATA_HOSPITAL);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activatedRoute: ActivatedRoute, private busquedaServices: BusquedaService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({termino})=>{
      this.BusquedaGlobal(termino);
    })
  }

  BusquedaGlobal(termino:string){

   

    this.busquedaServices.busquedaglobal(termino).
    subscribe((resp:any)=>{
      console.log(resp)
      this.usuarios= resp.usuarios;
      this.dataSource.data= this.usuarios;
      this.medicos= resp.medicos;
      this.dataSourcemedico.data= this.medicos;
      this.hospitales= resp.hospitales;
      this.dataSourcehsopitales.data= this.hospitales
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   
  }

  ngAfterViewInitMedico(){
    this.dataSourcemedico.paginator = this.paginator;
    this.dataSourcemedico.sort = this.sort;
  }

  ngAfterViewInitHospital(){
    this.dataSourcehsopitales.paginator = this.paginator;
      this.dataSourcehsopitales.sort = this.sort;
  }


  

}
