import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Lesson, LessonReq } from '../model/lesson';
import { TableColumn } from '../model/tableColumn';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-lesson-management',
  templateUrl: './lesson-management.component.html',
  styleUrls: ['./lesson-management.component.less']
})
export class LessonManagementComponent implements OnInit {
  CourseId: string;
  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: LessonReq = new LessonReq();
  totalRecords: number = 0;
  data: Lesson[] = new Array();
  dataTemp: Lesson[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Lesson;

  constructor(private _courseService: CourseService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this._activatedRouter.params.subscribe(parameters => {
      this.CourseId = this._activatedRouter.snapshot.params.id;
      this.params = { PageNumber: 1, PageSize: 25, CourseId: this.CourseId };
    });

    this.cols = [
      {
        header: 'Order',
        field: 'SortOrder',
      },
      {
        header: 'Title',
        field: 'Title',
      },
      {
        header: 'Photo',
        field: 'Photo',
      },
      {
        header: 'Video',
        field: 'Video',
      },
      {
        header: 'Description',
        field: 'Description',
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._courseService
      .getLesson(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: Lesson): void {
    this.waiting = true;
    const temp: any = { ...record };
    temp.SortOrder = temp.SortOrder.toString();
    this._courseService
      .updateLesson(temp)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
      }, er => { this.waiting = false; });
  }

  delete(record: Lesson): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._courseService
          .deleteLesson(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Lesson) {
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
    this.originalVal = { ...row };
    row.isEditable = true;
  }

  cancel(row: Lesson) {
    row = { ...this.originalVal };
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
    this.item = new Lesson();
    this.item.CourseId = this.CourseId;
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
    const temp: any = { ...this.item };
    temp.SortOrder = temp.SortOrder.toString();
    this._courseService
      .addLesson(temp)
      .subscribe(res => {
        this.item.Id = res.Data.Id;
        this.data.push(this.item);
        this.dataTemp.push(this.item);
        this.waiting = false;
        this.dialog = false;
        this.item = new Lesson();
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created Successfully', life: 3000 });
      }, er => {
        this.waiting = false;
      });
  }

}
