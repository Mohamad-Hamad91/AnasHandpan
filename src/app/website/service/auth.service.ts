import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginReq, LoginRes, RegisterReq, RegisterRes, VerifyReq, VerifyRes } from '../model/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  register(data: RegisterReq) : Observable<RegisterRes> {
    return this._http.post<RegisterRes>(this._thisURL + 'register', data);
  }

  verify(data: VerifyReq) : Observable<VerifyRes> {
    return this._http.post<VerifyRes>(this._thisURL + 'verifyAccount', data);
  }

  login(data : LoginReq): Observable<LoginRes> {
    return this._http.post<LoginRes>(this._thisURL + 'login', data);
  }

}
