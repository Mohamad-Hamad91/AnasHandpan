import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AdminAuthService } from '../service/admin-auth.service';

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
  constructor(private _router: Router, private _authService: AdminAuthService) { }

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
        label: 'General',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/'],
            command: () => {
              this._router.navigate(['/']);
            },
          }
        ]
      },
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
      },
      {
        label: 'Website',
        items: [
          {
            label: 'Sections',
            icon: 'pi pi-table',
            routerLink: ['/dashboard/sections'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Cover Photo',
            icon: 'pi pi-image',
            routerLink: ['/dashboard/cover'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Personal Info',
            icon: 'pi pi-user',
            routerLink: ['/dashboard/personal-info'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Social Links',
            icon: 'pi pi-facebook',
            routerLink: ['/dashboard/social-media'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Music',
            icon: 'fa fa-music',
            routerLink: ['/dashboard/music'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Albums',
            icon: 'fa fa-album-collection',
            routerLink: ['/dashboard/albums'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Courses',
            icon: 'fa fa-pen',
            routerLink: ['/dashboard/courses'],
            command: () => {
              this.sideBarShow = false;
            },
          },
        ]
      },
    ];
  }

  logout() {
    this._authService
      .logout()
      .subscribe(res => {
        localStorage.clear();
        this._router.navigate(['/']);
      }, er => { });
  }

}
