import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Home } from '../model/home';
import { VerifyReq } from '../model/login';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  data: VerifyReq = new VerifyReq();
  headerData: Home = new Home();
  // @ViewChild('VerificationCode') VerificationCode: HTMLFormElement;

  constructor(private _authservice: AuthService, private _router: Router,
     private _messageService: MessageService,
     private _dataService: DataService) { }

  ngOnInit(): void {
    this.data.Email = localStorage.getItem('email');
    this._dataService.get().subscribe(res => {
      this.headerData = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
  }

  verify() {
    this._authservice
      .verify(this.data)
      .subscribe(res => {
        localStorage.setItem('role', 'USER');
        localStorage.setItem('sID', res.Data?.SessionId);
        localStorage.setItem('username', res.Data?.Profile?.Name?.toString());
        localStorage.setItem('email', res.Data?.Profile?.Email?.toString());
        this._router.navigate(['/']);
      }, er => { });
  }

  resend() {
    this._authservice
      .resendCode({ Email: this.data.Email })
      .subscribe(res => {
        this._messageService.add({ severity: 'success', summary: 'Verification Code sent' });
      }, er => { });
  }


}
