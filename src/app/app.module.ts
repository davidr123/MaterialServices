import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ModalimagenComponent } from './components/modalimagen/modalimagen.component';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
   
    ModalimagenComponent,
  
   
   
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    RouterModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule
  
    

    
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
