import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section, SectionsRes } from '../model/section';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(): Observable<SectionsRes> {
    return this._http.get<SectionsRes>(this._thisURL + 'sideMenu');
  }

  update(data: Section): Observable<SectionsRes> {
    return this._http.put<SectionsRes>(this._thisURL + 'sideMenu', data);
  }

}
