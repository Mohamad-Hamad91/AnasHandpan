import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReq } from '../model/login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  data: LoginReq = new LoginReq();
  @ViewChild('Email') Email!: HTMLFormElement;
  @ViewChild('Password') Password!: HTMLFormElement;

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this._authService.login(this.data)
      .subscribe(res => {
        localStorage.setItem('role', 'USER');
        localStorage.setItem('sID', res.Data?.SessionId);
        localStorage.setItem('username', res.Data?.Profile?.Name?.toString());
        localStorage.setItem('email', res.Data?.Profile?.Email?.toString());
        this._router.navigate(['/']);
      }, er => { });
  }

}
