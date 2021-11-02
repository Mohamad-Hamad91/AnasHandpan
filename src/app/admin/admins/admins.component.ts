import { Component, OnInit } from '@angular/core';
import { Admin, AdminsReq, Role } from '../model/admin';
import { TableColumn } from '../model/tableColumn';
import { AdminsService } from '../service/admins.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.less']
})
export class AdminsComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  roles: Role[] = new Array();
  params: AdminsReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  admins: Admin[] = new Array();
  adminsTemp: Admin[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  admin: Admin;

  constructor(private _adminsService: AdminsService, private confirmationService: ConfirmationService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      {
        header: 'Username',
        field: 'Username',
      },
      {
        header: 'Role',
        field: 'Role',
      }
    ];
    this.waiting = true;
    this._adminsService
      .getRoles()
      .subscribe(res => {
        this.roles = res.Data?.List;
        this.getData();
      }, er => { this.waiting = false; });

  }// end of init

  getData(): void {
    this.waiting = true;
    this._adminsService
      .getAdmins(this.params)
      .subscribe(res => {
        this.admins = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        // debugger;
        this.admins.forEach(admin => {
          admin.Role = this.roles.find(role => role.Id === admin.RoleId);
          admin.RoleName = admin.Role.Title;
        });
        this.waiting = false;
        this.adminsTemp = [...this.admins];
      }, er => { this.waiting = false; });
  }

  getRoles(): void {
    this._adminsService
      .getRoles()
      .subscribe(res => {
        this.roles = res.Data?.List;
        this.waiting = false;
      }, er => { this.waiting = false; });
  }

  updateAdmin(admin: Admin): void {
    this.waiting = true;
    this._adminsService
      .updateAdmin(admin, admin.Id)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        admin.isEditable = false;
      }, er => { this.waiting = false; });
  }

  deleteAdmin(admin: Admin): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${admin.Username}?`,
      accept: () => {
        this.waiting = true;
        this._adminsService
          .deleteAdmin(admin.Id)
          .subscribe(res => {
            this.admins = this.admins.filter(row => row.Id !== admin.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }

  roleChangedHandler(e, row: Admin) {
    row.RoleId = e.value;
    row.RoleName = this.roles.find(role => role.Id == e.value)?.Title;
  }

  editRow(row: Admin) {
    this.admins.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
    row.isEditable = true;
    this.originalVal = row.RoleId;
  }

  cancel(row: Admin) {
    row.RoleId = this.originalVal;
    row.RoleName = this.roles.filter(row => row.Id == this.originalVal)[0]?.Title;
    row.isEditable = false;
  }

  filterChange(query, colName) {
    this.waiting = true;
    // debugger;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.admins = [...this.adminsTemp];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.admins = this.adminsTemp.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.admins = [...this.adminsTemp];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.admins = this.admins.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.admins = [...this.adminsTemp];
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
    this.admin = new Admin();
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
    this._adminsService
      .addAdmin(this.admin)
      .subscribe(res => {
        this.admin.Id = res.Data.Id;
        this.admin.Role = this.roles.find(role => role.Id === this.admin.RoleId);
        this.admin.RoleName = this.admin.Role.Title;
        this.admins.push(this.admin);
        this.adminsTemp.push(this.admin);
        this.waiting = false;
        this.dialog = false;
        this.admin = new Admin();
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Created', life: 3000 });
      }, er => {
        this.waiting = false;
      });
  }



}
