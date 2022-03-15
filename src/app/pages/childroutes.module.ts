import { NgModule } from '@angular/core';



import { BuscarComponent } from './buscar/buscar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalComponent } from './mantenimientos/hospitales/hospital/hospital.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


import { DatosusuarioComponent } from './pedido/datosusuario/datosusuario.component';
import { PedidoComponent } from './pedido/pedido.component';
import { RouterModule, Routes } from '@angular/router';

const routesChildren: Routes=[
  
    //{path:'menu', component:PagesComponent},
    {path:'perfil', component:PerfilComponent},
    {path:'', component: DashboardComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'hospitales', component: HospitalesComponent},
    {path:'hospital/:id', component: HospitalComponent},
    {path:'medicos', component: MedicosComponent},
    {path:'medico/:id', component: MedicoComponent},
    {path:'buscar/:termino', component: BuscarComponent},

    //PEDIDO
    {path:'pedido', component: PedidoComponent},
    {path:'pedido/:nombre', component: DatosusuarioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routesChildren),],
  exports: [RouterModule]
})
export class ChildroutesModule { }
