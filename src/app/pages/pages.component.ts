import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [MediaMatcher]
})
export class PagesComponent  {


  mobileQuery: MediaQueryList ;

  private _mobileQueryListener: (() => void) ;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: Router) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    Logout(){
      this.route.navigateByUrl('login');
      localStorage.removeItem('token');
    }

 

}
