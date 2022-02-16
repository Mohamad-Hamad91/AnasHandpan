import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../model/home';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.less']
})
export class ForgetPassComponent implements OnInit {

  Email!: string;
  headerData: Home = new Home();

  constructor(private _authService: AuthService, private _router: Router,
    private _dataService: DataService) { }

  ngOnInit(): void {
    this._dataService.get().subscribe(res => {
      this.headerData = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
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
