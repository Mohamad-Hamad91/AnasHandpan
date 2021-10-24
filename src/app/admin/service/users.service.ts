import { Injectable } from '@angular/core';
import { BaseResponse } from '../model/baseResponse';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersReq, UsersRes } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  getUsers(params: UsersReq): Observable<UsersRes> {
    return this._http.get<UsersRes>(this._thisURL + 'users',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
