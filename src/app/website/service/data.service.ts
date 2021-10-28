import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  // get(): Observable<SectionsRes> {
  //   return this._http.get<SectionsRes>(this._thisURL + 'sideMenu');
  // }


}
