import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'email', 'nombre', 'role', 'acciones'];

  ELEMENT_DATA: Usuario[]=[];

  dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  public totalUsuarios:number=0;

  public usuario: Usuario[]=[] ;

  public cargando = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private usuarioService: UsuarioService) {

    
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

  ngOnInit(): void {
    this.CargarUsuario();
  }

  CargarUsuario(){
    this.cargando= true;
    this.usuarioService.cargarusuario().subscribe(
      ({total, usuarios})=>{
      console.log(usuarios);
      this.totalUsuarios=total
      this.usuario= usuarios
      this.dataSource.data= usuarios;

      }, (err)=>{
        console.log(err)
      })
  }

}
