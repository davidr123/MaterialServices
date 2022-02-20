import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public imagenUrl: string='';
  public usuario!:Usuario;

  constructor(private usuarioService: UsuarioService) { 

    this.imagenUrl= usuarioService.usuario.imagenUrl;
    this.usuario= usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
