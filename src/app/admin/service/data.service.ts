import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoverRes } from '../model/cover';
import { PersonalInfoRes } from '../model/personalInfo';
import { UploadRes } from '../model/upload';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(): Observable<CoverRes> {
    return this._http.get<CoverRes>(this._thisURL + 'coverPhoto');
  }

  update(data: { CoverPhoto: string }): Observable<CoverRes> {
    return this._http.put<CoverRes>(this._thisURL + 'coverPhoto', data);
  }

  getPersonal(): Observable<PersonalInfoRes> {
    return this._http.get<PersonalInfoRes>(this._thisURL + 'personalInfo');
  }


  updatePersonal(data: { PersonalInfo: string }): Observable<PersonalInfoRes> {
    return this._http.put<PersonalInfoRes>(this._thisURL + 'personalInfo', data);
  }

  upload(data: FormData): Observable<UploadRes>{
    return this._http.post<UploadRes>(this._thisURL + 'uploadPublicFile', data);
  }

}
