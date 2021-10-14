import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddAdminRes, Admin, AdminsReq, AdminsRes, RoleRes } from '../model/admin';
import { BaseResponse } from '../model/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  getRoles(): Observable<RoleRes> {
    return this._http.get<RoleRes>(this._thisURL + 'roles');
  }

  getAdmins(params: AdminsReq): Observable<AdminsRes> {
    return this._http.get<AdminsRes>(this._thisURL + 'admins',
     { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  addAdmin(data: Admin): Observable<AddAdminRes> {
    return this._http.post<AddAdminRes>(this._thisURL + 'admins', data);
  }

  updateAdmin(data: Admin, id: string): Observable<AddAdminRes> {
    return this._http.put<AddAdminRes>(this._thisURL + 'admins/' + id, data);
  }

  deleteAdmin(id: string): Observable<BaseResponse>  {
    return this._http.delete<BaseResponse>(this._thisURL + 'admins/' + id);
  }
}
