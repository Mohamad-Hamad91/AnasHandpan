import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.less']
})
export class AdminNavbarComponent implements OnInit {

  sideBarShow: boolean = false;
  menuItems: MenuItem[] = [];
  userPages: MenuItem[] = [];
  sidebarItems: MenuItem[] = [];
  username: string | null = localStorage.getItem('username');
  role: string | null = localStorage.getItem('role');
  @ViewChild('menu') menu: any;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    this.userPages = [
      {
        label: 'Settings',
        icon: 'pi pi-globe'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        },
      },
    ];
  } // end of init

  getSideBarItems() {
    debugger;
    this.sideBarShow = true;
    this.sidebarItems = [
      {
        label: 'Manage Parties',
        items: [
          {
            label: 'Manage Admins',
            icon: 'pi pi-user',
            routerLink: ['/dashboard/admins'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Manage users',
            icon: 'pi pi-user-plus',
            routerLink: ['/dashboard/users'],
            command: () => {
              this.sideBarShow = false;
            },
          }
        ]
      }
    ];
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
