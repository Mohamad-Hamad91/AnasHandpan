import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactInfo, ContactInfoReq } from '../model/contact';
import { TableColumn } from '../model/tableColumn';
import { ContactManagementService } from '../service/contact-management.service';

@Component({
  selector: 'app-contact-info-management',
  templateUrl: './contact-info-management.component.html',
  styleUrls: ['./contact-info-management.component.less']
})
export class ContactInfoManagementComponent implements OnInit {

  //#region vars init
  // for spinner 
  waiting: boolean = false;
  // table columns
  cols: TableColumn[] = new Array();
  // params for pagination from backend
  params: ContactInfoReq = { PageNumber: 1, PageSize: 10 };
  // total number of records
  totalRecords: number = 0;
  // table data list
  data: ContactInfo[] = new Array();
  // a temp array to keep origin data for filtering
  dataTemp: ContactInfo[] = new Array();
  // a temp variable to keep the origin value of updated record
  originalVal: any;
  // keeps all filters on the table
  criteria: any = {};
  // count of filters on the table
  filtersNo: number = 0;
  // if the user submitted the dialog or not
  submitted: boolean;
  // to display the create and update dialog
  dialog: boolean;
  // an object contains the dialog form data
  tmp: ContactInfo;
  //#endregion vars init

  constructor(private _contactService: ContactManagementService, private confirmationService: ConfirmationService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { header: 'Order', field: 'SortOrder', },
      { header: 'Name', field: 'Name', },
      { header: 'Icon', field: 'Icon', },
      { header: 'Value', field: 'Value', }
    ];

    this.getData();
  }

  getData(): void {
    this.waiting = true;
    this._contactService
      .getInfo(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: ContactInfo): void {
    this.waiting = true;
    this._contactService
      .updateInfo(record)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
      }, er => { this.waiting = false; });
  }

  delete(record: ContactInfo): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this._contactService
          .deleteInfo(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
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


  editRow(row: ContactInfo) {
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
    this.originalVal = { ...row };
    row.isEditable = true;
  }

  cancel(row: ContactInfo) {
    row = { ...this.originalVal };
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
  }

  filterChange(query, colName) {
    this.waiting = true;
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

  openNew() {
    this.tmp = new ContactInfo();
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
    this._contactService
      .addInfo(this.tmp)
      .subscribe(res => {
        this.tmp.Id = res.Data.Id;
        this.data.push(this.tmp);
        this.dataTemp.push(this.tmp);
        this.waiting = false;
        this.dialog = false;
        this.tmp = new ContactInfo();
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created Successfully', life: 3000 });
      }, er => {
        this.waiting = false;
      });
  }

}
