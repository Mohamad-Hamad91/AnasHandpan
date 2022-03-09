import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactInfoReq, ContactMessage } from '../model/contact';
import { TableColumn } from '../model/tableColumn';
import { ContactManagementService } from '../service/contact-management.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.less']
})
export class ContactManagementComponent implements OnInit {

  //#region vars init
  // for spinner
  waiting: boolean = false;
  // table columns
  cols: TableColumn[] = new Array();
  // for pagination from the backend
  params: ContactInfoReq = { PageNumber: 1, PageSize: 10 };
  // total nuber of records
  totalRecords: number = 0;
  // data list of the table 
  data: ContactMessage[] = new Array();
  // a temp list to keep the original data for filtering
  dataTemp: ContactMessage[] = new Array();
  // a temp var to keep the original value of the updated record
  originalVal: any;
  // an object contains all filters on the table
  criteria: any = {};
  // count of the filters on the table
  filtersNo: number = 0;
  // if the user submitted the dialog or not
  submitted: boolean;
  // to display the dialog or not
  dialog: boolean;
  // a temp variable contains the object in the form in the dialog
  tmp: ContactMessage;
  //#endregion

  constructor(private _contactService: ContactManagementService, private confirmationService: ConfirmationService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { header: 'Email', field: 'Email', },
      { header: 'Name', field: 'Name', },
      { header: 'Phone', field: 'Phone', },
      { header: 'Subject', field: 'Subject', },
    ];

    this.getData();
  }

  getData(): void {
    this.waiting = true;
    this._contactService
      .getMessages(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  delete(record: ContactMessage): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this._contactService
          .deleteMessage(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  paginate(event) {
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    this.getData();
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

  editRow(row: ContactMessage) {
    this.tmp = row;
    this.dialog = true;
  }

  clearFilter() {
    this.criteria = {};
    this.data = [...this.dataTemp];
    this.filtersNo = 0;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

}
