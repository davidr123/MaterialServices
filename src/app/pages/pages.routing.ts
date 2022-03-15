import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildroutesModule } from './childroutes.module';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guard/auth.guard';

const routes:Routes=[

    
  {path:'dashboard', 
   component:PagesComponent,
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
   loadChildren:()=> import('./childroutes.module').then(m=>m.ChildroutesModule)

},
]



@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  