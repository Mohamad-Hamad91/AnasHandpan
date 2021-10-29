import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddMusicRes, Music, MusicReq, MusicRes } from '../model/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: MusicReq): Observable<MusicRes> {
    return this._http.get<MusicRes>(this._thisURL + 'music',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  add(data: Music): Observable<AddMusicRes> {
    data.SortOrder = data.SortOrder.toString();
    return this._http.post<AddMusicRes>(this._thisURL + 'music', data);
  }

  update(data: Music): Observable<AddMusicRes> {
    return this._http.put<AddMusicRes>(this._thisURL + 'music/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'music/' + id);
  }
}
