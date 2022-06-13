import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy  {

  @Input() titulo!:string;
  public titleSubs$!:Subscription;

  constructor(private route: Router) {
    
      
    this.titleSubs$= this.getArgumentos().subscribe(({title})=>{
      this.titulo = title;
    })
  }


  ngOnDestroy(): void {
   this.titleSubs$.unsubscribe();
  }

  
  getArgumentos(){

    return this.route.events.pipe(
       filter((event:any)=> event instanceof ActivationEnd),
       filter((event:ActivationEnd)=> event.snapshot.firstChild=== null),
       map((event:ActivationEnd)=> event.snapshot.data)
     )
 
 
   }


}
