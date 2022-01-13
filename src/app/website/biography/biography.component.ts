import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../model/home';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.less']
})
export class BiographyComponent implements OnInit {

  data: Home = new Home();
  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  sections: string[] = new Array();
  role: string;
  ready: boolean = false;

  constructor(private _dataService: DataService, private _router: Router,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this._dataService.get().subscribe(res => {
      this.data = res.Data;
      for (const key in this.data.SideMenu) {
        if (this.data.SideMenu[key] == '1') {
          if (key == 'MyCourses' || key == 'MyOrders') {
            if (this.isLoggedin && this.role === 'USER') this.sections.push(key);
          } else this.sections.push(key);
        }
      }
      this.ready = true;
    });
    this.role = localStorage.getItem('role');
    this.isAdmin = this.role === '1' || this.role === '2';
    this.isLoggedin = !!this.role;
    
  }

  menuClicked() {
    document.getElementById('open-menu')?.classList?.add('active');
    document.getElementById('menu-fixed-container')?.classList?.add('open');
  }

  xClicked() {
    document.getElementById('open-menu')?.classList?.remove('active');
    document.getElementById('menu-fixed-container')?.classList?.remove('open');
  }

  navigateTo(element: string) {
    this._router.navigate(['/details/' + element]);
    this.xClicked();
  }

  logoutConfirm() {
    this.xClicked();
    const elm: HTMLElement = document.getElementById('cartParent');
    elm.style.display = 'block';
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
    const elm: HTMLElement = document.getElementById('cartParent');
    elm.style.display = 'none';
  }

}
