import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Sections } from '../model/sections';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})
export class TopHeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  sections: string[] = new Array();
  role: string;

  @Output() Navigate = new EventEmitter();

  @Input('data') data: Sections = new Sections();

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.isAdmin = this.role === '1' || this.role === '2';
    this.isLoggedin = !!this.role;
    for (const key in this.data) {
      if (this.data[key] === '1') {
        if (key == 'MyCourses' || key == 'MyOrders') {
          if (this.isLoggedin && this.role === 'USER') this.sections.push(key);
        } else this.sections.push(key);
      }
    }
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
    this.Navigate.emit(element);
    this.xClicked();
  }

}
