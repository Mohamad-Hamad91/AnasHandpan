import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddOrderReq, AddOrderRes, OrderReq, OrderRes } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  add(order: AddOrderReq): Observable<AddOrderRes> {
    return this._http.post<AddOrderRes>(this._thisURL + 'orders', order);
  }

  getAll(params: OrderReq): Observable<OrderRes> {
    return this._http.get<OrderRes>(this._thisURL + 'orders',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
