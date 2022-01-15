import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course, CourseReq } from '../model/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.less']
})
export class MyCoursesComponent implements OnInit {

  data: Course[] = new Array();
  params: CourseReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;
  floor = Math.floor;

  constructor(private _dataService: CourseService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService.getMyCourses(this.params)
      .subscribe(res => {
        this.data.push(...res.Data.List);
        this.totlaCount = +res.Data.TotalCount;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  loadMore() {
    this.params.PageNumber++;
    this.getData();
  }
}
