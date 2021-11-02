import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNewsRes, News, NewsReq, NewsRes } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: NewsReq): Observable<NewsRes> {
    return this._http.get<NewsRes>(this._thisURL + 'news',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  getOne(id: string): Observable<AddNewsRes> {
    return this._http.get<AddNewsRes>(this._thisURL + 'news/' + id);
  }

  add(data: News): Observable<AddNewsRes> {
    return this._http.post<AddNewsRes>(this._thisURL + 'news', data);
  }

  update(data: News): Observable<AddNewsRes> {
    return this._http.put<AddNewsRes>(this._thisURL + 'news/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'news/' + id);
  }


}
