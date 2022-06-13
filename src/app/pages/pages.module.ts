import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FlexLayoutModule } from '@angular/flex-layout';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { ImagenModule } from '../pipes/imagen.module';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { HospitalComponent } from './mantenimientos/hospitales/hospital/hospital.component';
import { BuscarComponent } from './buscar/buscar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PedidoComponent } from './pedido/pedido.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DatosusuarioComponent } from './pedido/datosusuario/datosusuario.component';
import { ProductoComponent } from './pedido/producto/producto.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ConfirmacionComponent } from './pedido/confirmacion/confirmacion.component';
import { BreadcrumbsComponent } from './mantenimientos/breadcrumbs/breadcrumbs.component';


@NgModule({
  declarations: [
    PagesComponent,

   DashboardComponent,
     UsuariosComponent,
     PerfilComponent,
     SidebarComponent,
     HospitalesComponent,
     MedicosComponent,
     MedicoComponent,
     HospitalComponent,
     BuscarComponent,
     PedidoComponent,
     DatosusuarioComponent,
     ProductoComponent,
     ConfirmacionComponent,
     BreadcrumbsComponent
   
    
 
  ],

  exports:[
    DashboardComponent,
    BreadcrumbsComponent
  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
     MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    ImagenModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
   
   

    
    
   
   
  ],
  
})
export class PagesModule { }
