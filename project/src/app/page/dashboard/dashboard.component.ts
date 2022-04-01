import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  decode  from 'jwt-decode';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public username: string = ""

  public admin: boolean = false

  public user: any = false

  constructor( private token: TokenService, private router: Router ){

  }
  
  ngOnInit(): void {
    let whoIs = sessionStorage.getItem('User')
    if(whoIs == "admin") this.admin = true

    let token = sessionStorage.getItem('Permissão')

    let objectUser: any = decode(`${token}`)
    
    this.user = objectUser.name
  

    

  }

  public logout(){
    sessionStorage.removeItem('Permissão')
    this.router.navigate([''])
  }


}
