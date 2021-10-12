import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VerifyReq } from '../model/login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  data: VerifyReq = new VerifyReq();
  // @ViewChild('VerificationCode') VerificationCode: HTMLFormElement;

  constructor(private _authservice: AuthService, private _router: Router, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.data.Email = localStorage.getItem('email');
  }

  verify() {
    this._authservice
      .verify(this.data)
      .subscribe(res => {
        localStorage.setItem('role', '' + res.Data?.RoleId);
        localStorage.setItem('sID', res.Data?.SessionId);
        localStorage.setItem('username', res.Data?.Username);
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
