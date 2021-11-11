import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { SingleCourse } from '../model/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.less']
})
export class SingleCourseComponent implements OnInit {

  data: SingleCourse = new SingleCourse();
  waiting: boolean = true;
  CourseId: string;
  baseURL = environment.baseURL;
  role: string;
  isLoggedIn: boolean = false;

  constructor(private _courseService: CourseService, private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.CourseId = this._activatedRoute.snapshot.params.id;
      this.getData();
    });
    this.isLoggedIn = !!localStorage.getItem('sID');
    this.role = localStorage.getItem('role');
  }

  getData() {
    this.waiting = true;
    this._courseService
      .get(this.CourseId)
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  enroll() {
    if (!this.isLoggedIn || this.role != 'USER') {
      this._messageService.add({
        severity: 'info',
        summary: 'Not Logged-in!',
        life: 10000,
        detail: 'Please Login to Enroll this Course.',
      });
      return;
    } else {
      this.waiting = true;
      this._courseService.enroll(this.CourseId)
        .subscribe(res => {
          this.waiting = false;
          this._messageService.add({
            severity: 'success',
            summary: 'Done!',
            life: 10000,
            detail: 'Your Request is pending now, please check status in my courses page.',
          });
        }, er => this.waiting = false);
    }
  }

}
