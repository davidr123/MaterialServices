import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { BuscarComponent } from './buscar/buscar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalComponent } from './mantenimientos/hospitales/hospital/hospital.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { PagesComponent } from './pages.component';

const routes:Routes=[

    
  {path:'dashboard', 
   component:PagesComponent,
  canActivate:[AuthGuard],
  children: [

    

    //{path:'menu', component:PagesComponent},
    {path:'perfil', component:PerfilComponent},
    {path:'', component: DashboardComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'hospitales', component: HospitalesComponent},
    {path:'hospital/:id', component: HospitalComponent},
    {path:'medicos', component: MedicosComponent},
    {path:'medico/:id', component: MedicoComponent},
    {path:'buscar/:termino', component: BuscarComponent}
  
   
  
 
  ]

},
]



@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  