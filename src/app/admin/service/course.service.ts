import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCourseRes, Course, CourseReq, CourseRes } from '../model/course';
import { EnrollmentReq, EnrollmentRes } from '../model/enrollment';
import { AddLessonRes, Lesson, LessonReq, LessonRes } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: CourseReq): Observable<CourseRes> {
    return this._http.get<CourseRes>(this._thisURL + 'courses',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  add(data: Course): Observable<AddCourseRes> {
    return this._http.post<AddCourseRes>(this._thisURL + 'courses', data);
  }

  update(data: Course): Observable<AddCourseRes> {
    return this._http.put<AddCourseRes>(this._thisURL + 'courses/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'courses/' + id);
  }

  //#region Lessons
  getLesson(params: LessonReq): Observable<LessonRes> {
    return this._http.get<LessonRes>(this._thisURL + 'lessons',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize).append('CourseId', params.CourseId) });
  }

  getOneLesson(id: string): Observable<AddLessonRes> {
    return this._http.get<AddLessonRes>(this._thisURL + 'lessons/' + id);
  }

  addLesson(data: Lesson): Observable<AddLessonRes> {
    return this._http.post<AddLessonRes>(this._thisURL + 'lessons', data);
  }

  updateLesson(data: Lesson): Observable<AddLessonRes> {
    return this._http.put<AddLessonRes>(this._thisURL + 'lessons/' + data.Id, data);
  }

  deleteLesson(id: string) {
    return this._http.delete<any>(this._thisURL + 'lessons/' + id);
  }
  //#endregion Lessons

  getEnrollments(params: EnrollmentReq): Observable<EnrollmentRes> {
    return this._http.get<EnrollmentRes>(this._thisURL + 'enrollments',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize).append('CourseId', params.CourseId) });
  }

}
