import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService
      .logout()
      .subscribe(res => {
        localStorage.clear();
        this._router.navigate(['/']);
      }, er => { });
  }

  cancel() {
    this._router.navigate(['/']);
  }

}
