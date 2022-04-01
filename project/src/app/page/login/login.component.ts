import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public invalid: any = false

  constructor(private token: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  public getTheData(user: string, password: string, form: NgForm) {
    this.token.getTheToken(user, password).subscribe(
      res => res,
      error => {
        this.invalid = error.error.text
        form.resetForm()
      }
    )
  }

  public async login(form: NgForm){
   this.getTheData(`${form.value.user}`,`${form.value.password}`, form)

    
  }

  public logout(){
    sessionStorage.removeItem('Permissão')
    this.router.navigate([''])
  }

}
