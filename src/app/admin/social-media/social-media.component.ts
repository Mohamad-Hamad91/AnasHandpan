import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SocialMedia, SocialMediaReq } from '../model/social';
import { TableColumn } from '../model/tableColumn';
import { SocialMediaService } from '../service/social-media.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.less']
})
export class SocialMediaComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: SocialMediaReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  data: SocialMedia[] = new Array();
  dataTemp: SocialMedia[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  social: SocialMedia;

  constructor(private _socialService: SocialMediaService, private confirmationService: ConfirmationService,
    private _messageService: MessageService) { }

  ngOnInit(): void {

    this.cols = [
      {
        header: 'Order',
        field: 'SortOrder',
      },
      {
        header: 'Name',
        field: 'Name',
      },
      {
        header: 'Icon',
        field: 'Icon',
      },
      {
        header: 'Url',
        field: 'Url',
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._socialService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: SocialMedia): void {
    this.waiting = true;
    this._socialService
      .update(record)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
      }, er => { this.waiting = false; });
  }

  delete(record: SocialMedia): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this._socialService
          .delete(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: SocialMedia) {
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
    this.originalVal = { ...row };
    row.isEditable = true;
  }

  cancel(row: SocialMedia) {
    // debugger;
    row = {...this.originalVal};
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
  }

  filterChange(query, colName) {
    this.waiting = true;
    // debugger;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.data = [...this.dataTemp];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data = this.dataTemp.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data = [...this.dataTemp];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data = this.data.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data = [...this.dataTemp];
    this.filtersNo = 0;
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    // debugger;
    this.getData();
  }

  openNew() {
    this.social = new SocialMedia();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    this.waiting = true;
    this._socialService
      .add(this.social)
      .subscribe(res => {
        this.social.Id = res.Data.Id;
        this.data.push(this.social);
        this.dataTemp.push(this.social);
        this.waiting = false;
        this.dialog = false;
        this.social = new SocialMedia();
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created Successfully', life: 3000 });
      }, er => {
        this.waiting = false;
      });
  }

}
