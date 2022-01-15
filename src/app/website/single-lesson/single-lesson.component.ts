import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SingleLesson } from '../model/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.less']
})
export class SingleLessonComponent implements OnInit {

  private lessonId: string;
  data: SingleLesson = new SingleLesson();
  baseURL = environment.baseURL;

  constructor(private _dataService: CourseService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(r => {
      this.lessonId = this._route.snapshot.params.id;
      this.getData();
    })
  }

  getData() {
    this._dataService.getLesson(this.lessonId)
      .subscribe(res => {
        this.data = res.Data;
      });
  }

}
