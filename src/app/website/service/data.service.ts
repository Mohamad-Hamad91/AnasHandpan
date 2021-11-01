import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeRes } from '../model/home';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(): Observable<HomeRes> {
    return this._http.get<HomeRes>(this._thisURL + 'homePage');
  }


}
