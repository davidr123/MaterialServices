import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PagesComponent } from './pages.component';

const routes:Routes=[

    
  {path:'', 
  component:PagesComponent,
  canActivate:[AuthGuard],
  children: [

    {path:'dashboard', component: DashboardComponent, data:{titulo:'Dashboard'}},

    {path:'menu', component:PagesComponent},
    {path:'', redirectTo:'/dashboard', pathMatch:'full'}
 
  ]

},
]



@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  