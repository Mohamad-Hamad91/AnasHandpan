import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductReq, ProductRes, SingleProductRes } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _thisURL = environment.userURL;

  constructor(private _http: HttpClient) { }

  get(id: string): Observable<SingleProductRes> {
    return this._http.get<SingleProductRes>(this._thisURL + 'products/' + id);
  }

  getAll(params: ProductReq): Observable<ProductRes> {
    return this._http.get<ProductRes>(this._thisURL + 'products',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

}
