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


@NgModule({
  declarations: [
    PagesComponent,

   DashboardComponent,
   
    
 
  ],

  exports:[
    DashboardComponent,
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
    RouterModule
    
    
   
   
  ],
  
})
export class PagesModule { }
