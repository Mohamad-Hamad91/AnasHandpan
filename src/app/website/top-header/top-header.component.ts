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

  @Output() Navigate = new EventEmitter();

  @Input('data') data: Sections = new Sections();

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === '1';
    this.isLoggedin = !!localStorage.getItem('role');
    debugger;
    for (const key in this.data) {
      if (this.data[key] === '1') {
        this.sections.push(key);
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
