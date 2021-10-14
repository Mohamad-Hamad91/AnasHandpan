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
  params: AdminsReq = {PageNumber: 1, PageSize: 25};
  admins: Admin[] = new Array();
  originalVal: any;

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
    this._adminsService
      .getAdmins(this.params)
      .subscribe(res => {
        this.admins = res.Data.List;
        this.admins.forEach(admin => {
          admin.Role = this.roles.find(role => role.Id === admin.RoleId);
          admin.RoleName = admin.Role.Title;
        });
        this.waiting = false;
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

  addAdmin(admin: Admin): void {
    this._adminsService
      .addAdmin(admin)
      .subscribe(res => {
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



}
