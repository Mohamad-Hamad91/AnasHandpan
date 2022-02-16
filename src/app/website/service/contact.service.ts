import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactForm, ContactInfoRes } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _thisURL = environment.userURL + 'contactInfo';
  private _contactURL = environment.userURL + 'contactUs';

  constructor(private _http: HttpClient) { }

  getContactInfo(): Observable<ContactInfoRes> {
    return this._http.get<ContactInfoRes>(this._thisURL);
  }

  sendContact(data: ContactForm) {
    return this._http.post<any>(this._contactURL, data);
  }

}
