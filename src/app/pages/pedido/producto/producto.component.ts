import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { delay } from 'rxjs/operators';
import { ItemFormProducto } from 'src/app/interfaces/ItemFormProducto.interface';
import { Producto } from 'src/app/models/producto.models';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'codigo', 'cantidad', 'precio', 'acciones'];

  public productos:Producto[]=[];

  public productoSeleccionado:Producto | undefined;
  public productoAnadido:Producto | undefined;
  public hasquery: boolean=false;

  public formProducto!:FormGroup;

  ELEMENT_DATA: Producto[]=[];

  public Nueva_Data:Producto[]=[]

public arrayProducto:Producto[]=[];

public query!:string;
  dataSource= new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private productoServices: ProductoService, private fb: FormBuilder, private route:Router
    ,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

this.formProducto=this.fb.group({
productos:['', Validators.required]
});

this.AñadirProducto();


this.productoServices.cambioArray.
pipe(
  delay(100)
).subscribe(
  resp=>{console.log(resp)}
)

  
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



MostrarProductos(event:any){
  this.query = event?.target?.value;

  if(this.query?.trim()?.length<1){
    Swal.fire('Campo Vacio', 'Producto no encontrado', 'warning');
    return ;
    }
    this.hasquery= false;
    this.productoServices.getproductosbyNombre(this.query?.trim())
  .subscribe(resp=>{

    this.productos= resp;
    //this.dataSource.data= this.productos
       this.hasquery= true;



 })  
}


BorrarProducto_New( item:string ) {


 const index= this.arrayProducto.findIndex((elemento)=> elemento._id === item)
  if(index!==-1){
    console.log(index)

    this.Nueva_Data= this.arrayProducto.splice(index,1);
    Swal.fire('Borrado', 'Producto Borrado', 'success');
     this.productoServices.cambioArray.emit(this.arrayProducto);
     this.dataSource= new MatTableDataSource(this.arrayProducto);
   
   }
  
 




}


AñadirProducto(){
  this.formProducto.get('productos')?.valueChanges
  .subscribe(productoID=>{
    console.log(productoID)
    this.productoSeleccionado= this.productos.find(p=> p._id ===  productoID);
    console.log(this.productoSeleccionado)
    if(productoID=== this.productoSeleccionado?._id){
      this.arrayProducto.push(this.productoSeleccionado!)
       this.dataSource= new MatTableDataSource(this.arrayProducto);
        
       this.productoServices.EnviarArrayaInformacion.emit(this.arrayProducto)

     
    }else{
     
    return;
  
    }
  
  
  
  });
}

CrearProducto(){
  this.productoServices.crearproducto(this.formProducto.value)
  .subscribe(resp=>{



  })
}


  ObtenerProductobyId(producto:Producto){
    this.productoServices.getproductobyid(producto._id)
    .subscribe(producto=>{
     this.productoSeleccionado=producto
     console.log(this.productoSeleccionado);
    })
  }

  BorrarProducto(id:string){

 

this.productoAnadido= this.arrayProducto.find(id=> id._id )
console.log(this.productoAnadido?._id)

if(this.productoAnadido?._id=== id){
  console.log(id)
  this.productoServices.borrarproducto(id)
  .subscribe((resp:any)=>{
    console.log(resp)
  
  
 
  
  this.productoServices.cambioArray.emit(this.arrayProducto)
  this.dataSource= new MatTableDataSource(this.arrayProducto);
  
    Swal.fire('Borrado', 'el producto a sido borrado con éxito', 'success');
  
  
  
    console.log('arrpro', this.arrayProducto);
    console.log('borrado', resp);
  })

}else{
  return;
}


  

 


  }





  getArryProductos(){
  this.productoServices.getprod()
  .pipe(
    delay(100)
  )
  .subscribe(resp=>{
 this.arrayProducto= resp
 console.log(this.arrayProducto)

  })
  }


}
