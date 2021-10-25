import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SocialMediaComponent } from './admin/social-media/social-media.component';
import { UsersComponent } from './admin/users/users.component';
import { ForgetPassCodeComponent } from './website/forget-pass-code/forget-pass-code.component';
import { ForgetPassComponent } from './website/forget-pass/forget-pass.component';
import { HomeComponent } from './website/home/home.component';
import { LoginComponent } from './website/login/login.component';
import { LogoutComponent } from './website/logout/logout.component';
import { RegisterComponent } from './website/register/register.component';
import { VerifyComponent } from './website/verify/verify.component';

const routes: Routes = [
  //#region website section
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPassComponent },
  { path: 'forget-password-code', component: ForgetPassCodeComponent },
  { path: 'logout', component: LogoutComponent },
  //#endregion website section

  //#region Admin section
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'admins', component: AdminsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'social-media', component: SocialMediaComponent }
    ]
  },
  //#endregion Admin section
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
