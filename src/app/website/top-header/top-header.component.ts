import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})
export class TopHeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedin: boolean = false;

  @ViewChild('openMenu') openMenu!: HTMLAnchorElement;
  @ViewChild('menu') menu!: HTMLDivElement;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === '1';
    this.isLoggedin = !!localStorage.getItem('role');
  }

  menuClicked() {
    this.openMenu?.classList?.add('active');
    this.menu?.classList?.add('open');
    document.getElementById('open-menu')?.classList?.add('active');
    document.getElementById('menu-fixed-container')?.classList?.add('open');
  }

}
