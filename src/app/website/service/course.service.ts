import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseRes, SingleCourseRes, CourseReq, LessonsReq, LessonRes, SingleLessonRes } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleCourseRes> {
    return this._http.get<SingleCourseRes>(this._thisURL + 'courses/' + id);
  }

  getAll(params: CourseReq): Observable<CourseRes> {
    return this._http.get<CourseRes>(this._thisURL + 'courses',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  enroll(CourseId: string): Observable<any> {
    return this._http.post(this._thisURL + 'courses/enroll', { CourseId });
  }

  getMyCourses(params: CourseReq): Observable<CourseRes> {
    return this._http.get<CourseRes>(this._thisURL + 'myCourses',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  getLessons(params: LessonsReq): Observable<LessonRes> {
    return this._http.get<LessonRes>(this._thisURL + 'lessons',
      { params: (new HttpParams())
        .set('PageNumber', params.PageNumber)
        .append('PageSize', params.PageSize)
        .append('CourseId', params.CourseId) });
  }

  getLesson(id: string): Observable<SingleLessonRes> {
    return this._http.get<SingleLessonRes>(this._thisURL + 'lessons/' + id);
  }

  

}
