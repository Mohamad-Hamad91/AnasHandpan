import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.less']
})
export class ForgetPassComponent implements OnInit {

  Email!: string;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  requestCode() {
    this._authService
      .requestForgetPassCode({ Email: this.Email })
      .subscribe(res => { 
        localStorage.setItem('email', this.Email);
        localStorage.setItem('reqID', res.Data?.ForgetPasswordRequestId?.toString());
        this._router.navigate(['/forget-password-code'])
      }, er => { });
  }

}
