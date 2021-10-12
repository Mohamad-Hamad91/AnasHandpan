import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './website/home/home.component';
import { LoginComponent } from './website/login/login.component';
import { RegisterComponent } from './website/register/register.component';
import { VerifyComponent } from './website/verify/verify.component';

const routes: Routes = [
  //#region website section
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  //#endregion website section

  //#region Admin section
  { path: 'admin', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  //#endregion Admin section
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
