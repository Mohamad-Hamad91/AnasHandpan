import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../service/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent implements OnInit {

  Username: string = '';
  Password: string = '';

  constructor(private _router: Router,private _authService: AdminAuthService) { }

  ngOnInit(): void {
  }

  login() {
    this._authService
      .login({ Username: this.Username, Password: this.Password })
      .subscribe(res => { 
        localStorage.setItem('role', '' + res.Data?.RoleId);
        localStorage.setItem('sID', res.Data?.SessionId);
        this._router.navigate(['/']);
        
      }, er => { });
  }

}
