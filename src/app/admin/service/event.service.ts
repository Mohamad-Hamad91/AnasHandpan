import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddEventRes, EventReq, EventRes, Events } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: EventReq): Observable<EventRes> {
    return this._http.get<EventRes>(this._thisURL + 'events',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  getOne(id: string): Observable<AddEventRes> {
    return this._http.get<AddEventRes>(this._thisURL + 'events/' + id);
  }

  add(data: Events): Observable<AddEventRes> {
    return this._http.post<AddEventRes>(this._thisURL + 'events', data);
  }

  update(data: Events): Observable<AddEventRes> {
    return this._http.put<AddEventRes>(this._thisURL + 'events/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'events/' + id);
  }

}
