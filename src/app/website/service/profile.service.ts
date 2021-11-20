import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, ProfileRes } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(): Observable<ProfileRes> {
    return this._http.get<ProfileRes>(this._thisURL + 'profile');
  }

  update(data: Profile): Observable<ProfileRes> {
    return this._http.put<ProfileRes>(this._thisURL + 'profile', data);
  }

}
