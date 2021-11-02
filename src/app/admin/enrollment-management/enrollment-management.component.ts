import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Enrollment, EnrollmentReq } from '../model/enrollment';
import { TableColumn } from '../model/tableColumn';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-enrollment-management',
  templateUrl: './enrollment-management.component.html',
  styleUrls: ['./enrollment-management.component.less']
})
export class EnrollmentManagementComponent implements OnInit {

  CourseId: string;
  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: EnrollmentReq = new EnrollmentReq();
  totalRecords: number = 0;
  data: Enrollment[] = new Array();
  dataTemp: Enrollment[] = new Array();
  criteria: any = {};
  filtersNo: number = 0;

  constructor(private _courseService: CourseService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this._activatedRouter.params.subscribe(parameters => {
      this.CourseId = this._activatedRouter.snapshot.params.id;
      this.params = { PageNumber: 1, PageSize: 25, CourseId: this.CourseId };
    });

    this.cols = [
      {
        header: 'User Email',
        field: 'UserEmail',
      },
      {
        header: 'UserFullName',
        field: 'UserFullName',
      },
      {
        header: 'Date',
        field: 'Date',
      }
    ];

    this.getData();
  }

  getData(): void {
    this.waiting = true;
    this._courseService
      .getEnrollments(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
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

}
