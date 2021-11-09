import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumReq } from 'src/app/admin/model/albums';
import { environment } from 'src/environments/environment';
import { Album, AlbumRes, SingleAlbumRes } from '../model/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleAlbumRes> {
    return this._http.get<SingleAlbumRes>(this._thisURL + 'albums/' + id);
  }

  getAll(params: AlbumReq): Observable<AlbumRes> {
    return this._http.get<AlbumRes>(this._thisURL + 'albums',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
