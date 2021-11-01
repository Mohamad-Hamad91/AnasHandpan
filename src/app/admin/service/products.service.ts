import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProductRes, Product, ProductReq, ProductRes } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  _thisURL = environment.adminURl;

  constructor(private _http: HttpClient) { }

  get(params: ProductReq): Observable<ProductRes> {
    return this._http.get<ProductRes>(this._thisURL + 'products',
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  add(data: Product): Observable<AddProductRes> {
    return this._http.post<AddProductRes>(this._thisURL + 'products', data);
  }

  update(data: Product): Observable<AddProductRes> {
    return this._http.put<AddProductRes>(this._thisURL + 'products/' + data.Id, data);
  }

  delete(id: string) {
    return this._http.delete<any>(this._thisURL + 'products/' + id);
  }

}
