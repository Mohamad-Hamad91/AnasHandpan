import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCourseRes, Course, CourseReq, CourseRes } from '../model/course';

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

}
