import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddInfoRes, ContactInfo, ContactInfoReq, ContactInfoRes, ContactMessageRes } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactManagementService {

  private _infoURL: string = environment.adminURl + 'contactInfo';
  private _messagesURL: string = environment.adminURl + 'contactUs';

  constructor(private _http: HttpClient) { }

  getInfo(params: ContactInfoReq): Observable<ContactInfoRes> {
    return this._http.get<ContactInfoRes>(this._infoURL,
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  addInfo(data: ContactInfo): Observable<AddInfoRes> {
    data.SortOrder = data.SortOrder.toString();
    return this._http.post<AddInfoRes>(this._infoURL, data);
  }

  updateInfo(data: ContactInfo): Observable<AddInfoRes> {
    return this._http.put<AddInfoRes>(this._infoURL + '/' + data.Id, data);
  }

  deleteInfo(id: string) {
    return this._http.delete<any>(this._infoURL + '/' + id);
  }

  getMessages(params: ContactInfoReq): Observable<ContactMessageRes> {
    return this._http.get<ContactMessageRes>(this._messagesURL,
      { params: (new HttpParams()).set('PageNumber', params.PageNumber).append('PageSize', params.PageSize) });
  }

  deleteMessage(id: string) {
    return this._http.delete<any>(this._messagesURL + '/' + id);
  }

}
