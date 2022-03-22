import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto.models';
import { Usuario } from 'src/app/models/usuario.models';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {
  public usuario: Usuario;
  public formProducto!:FormGroup;
  public productos:Producto[]=[];
  public arrayProducto:Producto[]=[];
 public ELEMENT_DATA: Producto[]=[];
 public displayedColumns: string[] = ['descripcion', 'codigo', 'cantidad', 'precio', 'iva' , 'total'];
 public dataSource= new MatTableDataSource(this.ELEMENT_DATA);
  constructor(private productosServices:ProductoService, private fb: FormBuilder, private usuarioService:UsuarioService) {
   
    this.usuario= this.usuarioService.usuario;

   }
public productoSeleccionado:Producto|undefined;
 public subtotal :number=0;
public iva:number=0;
 public totalprecio!:number;
 public productoSeleccionadoConf:Producto|undefined;


 arr:Producto[]=[]
  ngOnInit(): void {
   

    this.formProducto=this.fb.group({
      productos:['', Validators.required]
      });
      
      this.formProducto.valueChanges.subscribe(idpro=>{
        console.log(idpro);
        this.productoSeleccionado= this.productos.find(p=>p._id === idpro)
        console.log(this.productoSeleccionado)
      })

      

    this.productosServices.EnviarArrayaInformacion
    .pipe(
      delay(100)
    )
    .subscribe(resp=>{
      console.log(resp)
      this.arrayProducto= resp
      this.dataSource= new MatTableDataSource(this.arrayProducto);

   this.totalprecio= this.arrayProducto.reduce((total, item)=>{
               return total +  item.precio;
     }, 0)


      });

     

    this.productosServices.cambioArray
    .pipe(
      delay(100)
    ).subscribe(resp=>{
      this.arrayProducto= resp
      this.dataSource= new MatTableDataSource(this.arrayProducto);
    })

  
   this.AñadirProducto();


  }


  AñadirProducto(){
    this.formProducto.get('productos')?.valueChanges
    .subscribe(productoID=>{
      console.log(productoID)
      this.productoSeleccionado= this.productos.find(p=> p._id ===  productoID);
      console.log(this.productoSeleccionado)
      if(productoID=== this.productoSeleccionado?._id){
        this.arrayProducto.push(this.productoSeleccionado!)
        console.log(this.arrayProducto)
        //this.productosServices.EnviarArrayaInformacion.emit(this.arrayProducto)
         this.dataSource= new MatTableDataSource(this.arrayProducto);
          

       
      }else{
       
      return;
    
      }
    
    
    
    });
  }


  getArryProductos(){
    this.productosServices.getprod()
    .pipe(
      delay(100)
    )
    .subscribe(resp=>{
   this.arrayProducto= resp
   this.dataSource= new MatTableDataSource(this.arrayProducto);
  
   console.log(this.arrayProducto)
  
    })
    }


    BorrarFactura(){
      if(this.arrayProducto.length===0){

        this.totalprecio=0;
        
      }
    }


}
