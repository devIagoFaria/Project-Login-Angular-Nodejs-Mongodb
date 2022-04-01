import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AdminGuard]},
  {path: "admin", component: AdminComponent,  canActivate: [AdminGuard], data: { expectedRole: ['Admin', 'Funcionario']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
