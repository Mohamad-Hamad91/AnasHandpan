import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {

  @Input('data') data: Course[];
  baseURL = environment.baseURL;
  floor = Math.floor;
  offset: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.offset = (this.data.length > 2 || window.innerWidth < 1000) ? 0 : this.data.length == 2 ? 11.5 : 33;
  }

}
