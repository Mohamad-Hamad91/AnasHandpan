import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleNewsRes } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleNewsRes> {
    return this._http.get<SingleNewsRes>(this._thisURL + 'news/' + id);
  }

}
