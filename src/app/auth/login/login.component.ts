import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  mobileQuery: MediaQueryList ;

  private _mobileQueryListener: (() => void) ;

  public formLogin= this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: Router, private fb:FormBuilder, private usuarioService: UsuarioService) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    CampoNoValido(campo: string){
if(this.formLogin.get(campo)?.invalid){
  
  return;
}
    }

    Login(){

    this.usuarioService.loginusuario(this.formLogin.value)
    .subscribe(resp=>{
      console.log(resp)
      this.route.navigateByUrl('');
      console.log('entro ')
    }, err=>{
      console.log(err);
      Swal.fire('Error', 'Usuario Invalido', 'error');
    })

    }

  

}
