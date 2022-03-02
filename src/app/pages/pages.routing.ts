import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
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
    {path:'medicos', component: MedicosComponent},
    {path:'medico/:id', component: MedicoComponent}
  
   
  
 
  ]

},
]



@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  