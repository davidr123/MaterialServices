import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalimagenComponent } from 'src/app/components/modalimagen/modalimagen.component';
import { Usuario } from 'src/app/models/usuario.models';
import { ModalimagenService } from 'src/app/services/modalimagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['avatar', 'email', 'nombre', 'role', 'acciones'];

  ELEMENT_DATA: Usuario[]=[];

  dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  public totalUsuarios:number=0;

  public usuario: Usuario[]=[] ;
public activarRoles: boolean=true;

public imgsubs!:Subscription;
  

  public cargando: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private usuarioService: UsuarioService, public dialog: MatDialog,
    private modalImagenService: ModalimagenService) {

    
   }
  ngOnDestroy(): void {
    this.imgsubs.unsubscribe();
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
this.imgsubs= this.modalImagenService.cambioImagen.pipe(
  delay(100)
).subscribe(resp=>{
  this.CargarUsuario();
})

  }

  CargarUsuario(){
   
    this.usuarioService.cargarusuario().subscribe(
      ({total, usuarios})=>{
      console.log(usuarios);
      this.totalUsuarios=total
      this.usuario= usuarios
      this.dataSource.data= usuarios;
      this.cargando= false;

      }, (err)=>{
        console.log(err)
      })
  }

  BorrarUsuario(usuario:Usuario): any{

   
    if(usuario.uid === this.usuarioService.uid){
    return  Swal.fire('Error', 'No se puede eliminar a usted mismo', 'warning')
    }

    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Estas seguro de borrar a ${usuario.nombre} !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarusuario(usuario).subscribe(
          resp=>{
            Swal.fire('Borrado', `${usuario.nombre} a sido elinimado con éxito`, 'success')
            this.CargarUsuario();
          }
          
         
          
        )
      }
    });


 
  }

  CambiarRole(usuario:Usuario){
    this.usuarioService.guardarrole(usuario).
      subscribe(resp=> {
        console.log(resp)
      }, (err)=>{
       Swal.fire('Error', 'Solo los administradores pueden cambiar rol', 'error');
        console.log(err)
      } )
  }

  openDialog(usuario:Usuario): void {
    console.log(usuario)
    const dialogRef = this.dialog.open(ModalimagenComponent, {
data: this.modalImagenService.abririmagen('usuarios', usuario.uid, usuario.img)
    });

    dialogRef.afterClosed().subscribe(result => {
   
      
    });
  }

}
