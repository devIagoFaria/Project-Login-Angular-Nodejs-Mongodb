import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  public url: string = 'http://localhost:3000'

  public User: any

  public token: any

  public jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTheToken(paramsOne: string, paramsTwo: string): 
  Observable<{ user: string, password: string }> {

    return this.http.post<{ user: string, password: string }>

      (`${this.url}/login`, { user: paramsOne, password: paramsTwo }).pipe(

        tap(res => { this.token = res }),

        tap(res => {

          sessionStorage.setItem('Permissão', `${this.token.token}`)
          this.router.navigate(['dashboard'])
        },
          error => {
            error
          }
        )
      )
  }


  public validationToken(): any {

    let local = sessionStorage.getItem('Permissão')
    
    if(sessionStorage.getItem('Permissão') != null){
      return !this.jwtHelper.isTokenExpired(`${local}`)
    }
    
  }



}
