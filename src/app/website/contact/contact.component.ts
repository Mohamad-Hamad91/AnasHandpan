import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ContactForm, ContactInfo } from '../model/contact';
import { Home } from '../model/home';
import { ContactService } from '../service/contact.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  headerData: Home = new Home();
  info: ContactInfo[] = [];
  form: ContactForm = new ContactForm();

  constructor(private _messageService: MessageService, private _dataService: DataService,
    private _contactService: ContactService) { }

  ngOnInit(): void {
    this.getContactInfo();

    this._dataService.get().subscribe(res => {
      this.headerData = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
  }

  getContactInfo() {
    this._contactService
      .getContactInfo()
      .subscribe(res => {
        this.info = res.Data.List;
      });
  }

  sendContact() {
    this._contactService
      .sendContact(this.form)
      .subscribe(res => {
        this._messageService.add({
          severity: 'success',
          detail: 'Contact Message Sent Successfully!'
        });
      });
  }

}
