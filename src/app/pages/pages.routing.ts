import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';

import { PagesComponent } from './pages.component';

const routes:Routes=[

    
  {path:'dashboard', 
   component:PagesComponent,
  canActivate:[AuthGuard],
  children: [

    

    {path:'menu', component:PagesComponent},
    {path:'perfil', component:PerfilComponent},
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
   
  
 
  ]

},
]



@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  