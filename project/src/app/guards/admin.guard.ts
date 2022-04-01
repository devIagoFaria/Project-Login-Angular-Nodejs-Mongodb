import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public allow: any;

  constructor(private router: Router, private token: TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  
      
    //VERIFICANDO QUEM ENTROU
    if(sessionStorage.getItem('Permissão') != null){ 
      let user: any = decode(`${sessionStorage.getItem('Permissão')}`) 

      if(user.admin == true){
        sessionStorage.setItem('User', "admin")
      }else{
      sessionStorage.setItem('User', "notAdmin")
      }

    } 
    
 
  


    //VALIDANDO O TOKEN
    let validation = this.token.validationToken()
    if (validation == true) {
      return true

    } else {
      this.router.navigate(['/'])
      return false

    }


  }



}
