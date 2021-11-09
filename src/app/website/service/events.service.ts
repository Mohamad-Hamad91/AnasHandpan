import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventsReq, EventsRes, SingleEventsRes } from '../model/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleEventsRes> {
    return this._http.get<SingleEventsRes>(this._thisURL + 'events/' + id);
  }

  getAll(params: EventsReq): Observable<EventsRes> {
    return this._http.get<EventsRes>(this._thisURL + 'events',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
