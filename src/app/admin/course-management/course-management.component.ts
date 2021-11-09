import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Course, CourseReq } from '../model/course';
import { TableColumn } from '../model/tableColumn';
import { CourseService } from '../service/course.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.less']
})
export class CourseManagementComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: CourseReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  data: Course[] = new Array();
  dataTemp: Course[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Course;
  baseURL: string = environment.baseURL;

  constructor(private _courseService: CourseService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _dataService: DataService) { }

  ngOnInit(): void {

    this.cols = [
      {
        header: 'Title',
        field: 'Title',
      },
      {
        header: 'Photo',
        field: 'Photo',
      },
      {
        header: 'Price',
        field: 'Price',
      },
      {
        header: 'Brief',
        field: 'Brief',
      },
      {
        header: 'Description',
        field: 'Description',
      },
      // {
      //   header: 'Demo',
      //   field: 'Demo',
      // },
      {
        header: 'AppearInHomePage',
        field: 'AppearInHomePage',
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._courseService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: Course): void {
    this.waiting = true;
    const temp: any = { ...record };
    temp.Price = temp.Price.toString();
    this._courseService
      .update(temp)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
        this.dialog = false;
        this.item = new Course();
      }, er => { this.waiting = false; });
  }

  delete(record: Course): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._courseService
          .delete(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Course) {
    // this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
    // this.originalVal = { ...row };
    // row.isEditable = true;
    this.item = row;
    this.submitted = false;
    this.dialog = true;
  }

  cancel(row: Course) {
    // debugger;
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
    this.item = new Course();
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
    temp.Price = temp.Price.toString();
    if (this.item.Id) {
      this.update(this.item);
    } else {
      this._courseService
        .add(temp)
        .subscribe(res => {
          this.item.Id = res.Data.Id;
          this.data.push(this.item);
          this.dataTemp.push(this.item);
          this.waiting = false;
          this.dialog = false;
          this.item = new Course();
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created Successfully', life: 3000 });
        }, er => {
          this.waiting = false;
        });
    }
  }


  onUpload(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Photo = res.Data.Url;
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  onUploadVideo(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Demo = res.Data.Url;
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  goToLessons(row: Course) {
    this._route.navigate([`/dashboard/lessons/${row.Id}`]);
    localStorage.setItem('CourseTitle', row.Title);
  }

  goToEnrollments(row: Course) {
    this._route.navigate([`/dashboard/enrollment/${row.Id}`]);
    localStorage.setItem('CourseTitle', row.Title);
  }

}
