import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ForgetPassCodeRes, ForgetPassResetReq, LoginReq, LoginRes, RegisterReq, RegisterRes, ResendForgetPassCodeReq, VerifyReq, VerifyRes, VerifyResendReq } from '../model/login';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  register(data: RegisterReq): Observable<RegisterRes> {
    return this._http.post<RegisterRes>(this._thisURL + 'register', data);
  }

  verify(data: VerifyReq): Observable<VerifyRes> {
    return this._http.post<VerifyRes>(this._thisURL + 'verifyAccount', data);
  }

  resendCode(data: VerifyResendReq): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(this._thisURL + 'resendVerificationCode', data);
  }

  login(data: LoginReq): Observable<LoginRes> {
    return this._http.post<LoginRes>(this._thisURL + 'login', data);
  }

  requestForgetPassCode(data: VerifyResendReq): Observable<ForgetPassCodeRes> {
    return this._http.post<ForgetPassCodeRes>(this._thisURL + 'forgetPasswordFirstStep', data);
  }

  resendForgetPassCode(data: ResendForgetPassCodeReq): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(this._thisURL + 'resendForgetPasswordCode', data);
  }

  resetPassForgetPass(data: ForgetPassResetReq): Observable<LoginRes> {
    return this._http.post<LoginRes>(this._thisURL + 'forgetPasswordSecondStep', data);
  }

  logout(): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(this._thisURL + 'logout', {});
  }

}
