import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../model/tableColumn';
import { User, UsersReq } from '../model/user';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: UsersReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  users: User[] = new Array();
  usersTemp: User[] = new Array();
  criteria: any = {};
  filtersNo: number = 0;

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.cols = [
      {
        header: 'Email',
        field: 'Email'
      },
      {
        header: 'Name',
        field: 'Name'
      },
      {
        header: 'Phone',
        field: 'Phone'
      },
      {
        header: 'JoinDate',
        field: 'JoinDate'
      }
    ];

    this.getData();
  }

  getData(): void {
    this.waiting = true;
    this._usersService
      .getUsers(this.params)
      .subscribe(res => {
        this.users = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.usersTemp = [...this.users];
      }, er => { this.waiting = false; });
  }

  filterChange(query, colName) {
    this.waiting = true;
    // debugger;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.users = [...this.usersTemp];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.users = this.usersTemp.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.users = [...this.usersTemp];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.users = this.users.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.users = [...this.usersTemp];
    this.filtersNo = 0;
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    this.getData();
  }

}
