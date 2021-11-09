import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsReq } from 'src/app/admin/model/news';
import { environment } from 'src/environments/environment';
import { NewsRes, SingleNewsRes } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleNewsRes> {
    return this._http.get<SingleNewsRes>(this._thisURL + 'news/' + id);
  }

  getAll(params: NewsReq): Observable<NewsRes> {
    return this._http.get<NewsRes>(this._thisURL + 'news',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
