import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {

  @Input('description') description;
  @Input('title') title;
  @Input('bg') bg;

  constructor() { }

  ngOnInit(): void {
  }

}
