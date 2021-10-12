import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})
export class TopHeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === '1';
    this.isLoggedin = !!localStorage.getItem('role');
  }

}
