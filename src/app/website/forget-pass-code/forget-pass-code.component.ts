import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Home } from '../model/home';
import { ForgetPassResetReq } from '../model/login';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-forget-pass-code',
  templateUrl: './forget-pass-code.component.html',
  styleUrls: ['./forget-pass-code.component.less']
})
export class ForgetPassCodeComponent implements OnInit {

  data: ForgetPassResetReq = new ForgetPassResetReq();
  headerData: Home = new Home();

  constructor(private _router: Router, private _authService: AuthService,
    private _messageService: MessageService, private _dataService: DataService) { }

  ngOnInit(): void {
    this.data.RequestForgetPasswordId = localStorage.getItem('reqID');
    this.data.Email = localStorage.getItem('email');
    this._dataService.get().subscribe(res => {
      this.headerData = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
  }

  resetPass() {
    if (this.data.NewPassword !== this.data.ConfirmPassword) {
      this._messageService.add({ severity: 'error', summary: 'Password doesn\'t match confirm password' });
      return;
    }
    this._authService
      .resetPassForgetPass(this.data)
      .subscribe(res => {
        localStorage.setItem('role', 'USER');
        localStorage.setItem('sID', res.Data?.SessionId);
        localStorage.setItem('username', res.Data?.Profile?.Name?.toString());
        localStorage.setItem('email', res.Data?.Profile?.Email?.toString());
        this._router.navigate(['/']);
      }, er => { });
  }

  resendCode() {
    this._authService
      .resendForgetPassCode({ Email: this.data.Email, ForgetPasswordRequestId: this.data.RequestForgetPasswordId })
      .subscribe(res => {
        this._messageService.add({ severity: 'success', summary: 'Code Sent Successfully' });
      }, er => { });
  }

}
