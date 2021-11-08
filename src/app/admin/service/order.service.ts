import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderRes, OrdersReq, OrdersRes, Orders, StatusHistory } from '../model/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: OrdersReq): Observable<OrdersRes> {
    return this._http.get<OrdersRes>(this._thisURL + 'orders',
      {
        params:
          (new HttpParams())
            .set('PageNumber', params.PageNumber)
            .append('PageSize', params.PageSize)
            // .append('ProductId', params.ProductId)
            // .append('UserId', params.UserId)
      });
  }

  getOne(id: string): Observable<OrderRes> {
    return this._http.get<OrderRes>(this._thisURL + 'orders/' + id);
  }

  addStatus(data: StatusHistory): Observable<any> {
    return this._http.post<any>(this._thisURL + 'orderStatuses', data);
  }

  deleteStatus(id: string) {
    return this._http.delete<any>(this._thisURL + 'orderStatuses/' + id);
  }


}
