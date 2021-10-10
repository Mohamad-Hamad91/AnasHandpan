import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginReq, LoginRes } from '../model/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  login(data : LoginReq): Observable<LoginRes> {
    return this._http.post<LoginRes>(this._thisURL + 'login', data);
  }
}
