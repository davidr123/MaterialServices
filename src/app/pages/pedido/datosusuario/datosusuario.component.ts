import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioPedido } from 'src/app/models/usuariopedido.models';
import { ProgresssnippetService } from 'src/app/progresssnippet/progresssnippet.service';
import { DatosusuarioService } from 'src/app/services/datosusuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-datosusuario',
  templateUrl: './datosusuario.component.html',
  styleUrls: ['./datosusuario.component.css']
})
export class DatosusuarioComponent implements OnInit {

  public FormDatosUsuarioPedido!: FormGroup;
  public usuarios: Usuario[]=[];

  public usuario!: Usuario;
 


  constructor(private datoUsuarioServices: DatosusuarioService, private fb:FormBuilder,
    private activatedRoute:ActivatedRoute, private usuarioServices:UsuarioService,
    private progressSpinnerService: ProgresssnippetService) { }

  ngOnInit(): void {

    

   
   // this.activatedRoute.params.subscribe(({nombre})=>this.ObtenerUsuariobyNombre(nombre))

    this.FormDatosUsuarioPedido= this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      identificacion:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      genero:['', Validators.required],
      direccion:['', Validators.required],
   

    })


    //this.ObtenerUsuariobyNombre();
  }


  CrearUsuarioPedido(){
    this.datoUsuarioServices.crearusuariopedido(this.FormDatosUsuarioPedido.value)
    .subscribe(resp=>{
      console.log(resp);
    });
  }

  /*
  
  ObtenerUsuariobyNombre(){
    let usu= this.usuario
    this.progressSpinnerService.attach();
    this.datoUsuarioServices.obtenerusuariobynombre(this.FormDatosUsuario.get('nombre')?.value)
    .pipe(finalize(() => this.progressSpinnerService.detach()))
    .subscribe(resp=>{
      console.log(resp)
    this.usuarios=resp
  
      

     
    })
  }

*/


}
