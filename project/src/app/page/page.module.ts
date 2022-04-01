import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingModule } from './routing.module';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule
  ]
})
export class PageModule { }
