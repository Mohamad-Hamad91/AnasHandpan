import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('Courses', { static: false }) Courses;
  @ViewChild('MyCourses', { static: false }) MyCourses;
  @ViewChild('Products', { static: false }) Products;
  @ViewChild('MyOrders', { static: false }) MyOrders;
  @ViewChild('Albums', { static: false }) Albums;
  @ViewChild('Events', { static: false }) Events;
  @ViewChild('News', { static: false }) News;

  constructor() { }

  ngOnInit(): void {
  }

  navigateTo(element: string) {
    debugger;
    this[element].nativeElement.scrollIntoView({ behavior: "smooth" });
  }

}
