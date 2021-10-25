import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddSocialRes, SocialMedia, SocialMediaReq, SocialMediaRes } from '../model/social';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: SocialMediaReq): Observable<SocialMediaRes> {
    return this._http.get<SocialMediaRes>(this._thisURL + 'socialMedia',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  add(data: SocialMedia): Observable<AddSocialRes> {
    data.SortOrder = data.SortOrder.toString();
    return this._http.post<AddSocialRes>(this._thisURL + 'socialMedia', data);
  }

  update(data: SocialMedia): Observable<AddSocialRes> {
    return this._http.put<AddSocialRes>(this._thisURL + 'socialMedia/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'socialMedia/' + id);
  }

}
