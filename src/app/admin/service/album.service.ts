import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddAlbumRes, Album, AlbumReq, AlbumRes } from '../model/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: AlbumReq): Observable<AlbumRes> {
    return this._http.get<AlbumRes>(this._thisURL + 'albums',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  getOne(id: string): Observable<AddAlbumRes> {
    return this._http.get<AddAlbumRes>(this._thisURL + 'albums/' + id);
  }


  add(data: Album): Observable<AddAlbumRes> {
    return this._http.post<AddAlbumRes>(this._thisURL + 'albums', data);
  }

  update(data: Album): Observable<AddAlbumRes> {
    return this._http.put<AddAlbumRes>(this._thisURL + 'albums/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'albums/' + id);
  }


}
