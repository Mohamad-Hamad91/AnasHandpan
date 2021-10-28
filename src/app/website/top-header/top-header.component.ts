import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})
export class TopHeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  sections: { name: string; view: number }[] = new Array();

  @Output() Navigate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === '1';
    this.isLoggedin = !!localStorage.getItem('role');
    this.sections = [
      // { name: 'Courses', view: 1 },
      // { name: 'MyCourses', view: 1 },
      // { name: 'Products', view: 1 },
      // { name: 'MyOrders', view: 1 },
      { name: 'Albums', view: 1 },
      { name: 'Events', view: 1 },
      { name: 'News', view: 1 },
    ];
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
