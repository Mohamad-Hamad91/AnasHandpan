import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Section } from '../model/section';
import { SectionsService } from '../service/sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.less']
})
export class SectionsComponent implements OnInit {

  data: Section = new Section();
  waiting: boolean = true;
  sections: string[];

  constructor(private dataService: SectionsService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this.dataService.get().subscribe(res => {
      this.data = res.Data;
      this.sections = Object.keys(this.data);
      this.waiting = false;
    }, er => this.waiting = false);
  }

  submitHandler() {
    // debugger;
    this.waiting = true;
    this.dataService.update(this.data)
    .subscribe(res=> {
      this.waiting = false;
      this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
    }, er => this.waiting = false);
  }

}
