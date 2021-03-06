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
    // debugger;
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
        label: 'Parties',
        visible: localStorage.getItem('role') === '1',
        items: [
          {
            label: 'Manage Admins',
            icon: 'pi pi-user',
            routerLink: ['/dashboard/admins'],
            command: () => {
              this.sideBarShow = false;
            },
            visible: localStorage.getItem('role') === '1'
          },
          {
            label: 'Manage users',
            icon: 'pi pi-user-plus',
            routerLink: ['/dashboard/users'],
            visible: localStorage.getItem('role') === '1',
            command: () => {
              this.sideBarShow = false;
            },
          }
        ]
      },
      {
        label: 'Website',
        // icon: 'pi pi-globe',
        items: [
          {
            label: 'Sections',
            icon: 'pi pi-table',
            routerLink: ['/dashboard/sections'],
            visible: localStorage.getItem('role') === '1',
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
            label: 'Contact Info',
            icon: 'pi pi-info',
            routerLink: ['/dashboard/contact-info'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Contact Messages',
            icon: 'pi pi-envelope',
            routerLink: ['/dashboard/contact'],
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
            label: 'News',
            icon: 'fa fa-newspaper-o',
            routerLink: ['/dashboard/news'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Events',
            icon: 'fa fa-calendar',
            routerLink: ['/dashboard/events'],
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Products',
            icon: 'fa fa-gift',
            routerLink: ['/dashboard/products'],
            visible: localStorage.getItem('role') === '1',
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Orders',
            icon: 'fa fa-gift',
            routerLink: ['/dashboard/orders-management'],
            visible: localStorage.getItem('role') === '1',
            command: () => {
              this.sideBarShow = false;
            },
          },
          {
            label: 'Courses',
            icon: 'fa fa-pen',
            routerLink: ['/dashboard/courses'],
            visible: localStorage.getItem('role') === '1',
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
