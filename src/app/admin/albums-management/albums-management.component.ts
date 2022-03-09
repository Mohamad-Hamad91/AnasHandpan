import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Album, AlbumReq } from '../model/albums';
import { TableColumn } from '../model/tableColumn';
import { AlbumService } from '../service/album.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-albums-management',
  templateUrl: './albums-management.component.html',
  styleUrls: ['./albums-management.component.less']
})
export class AlbumsManagementComponent implements OnInit {

  //#region vars init
  // for spinner
  waiting: boolean = false;
  // table columns
  cols: TableColumn[] = new Array();
  // for pagination from the back-end
  params: AlbumReq = { PageNumber: 1, PageSize: 10 };
  // total number of records
  totalRecords: number = 0;
  // the list of table data
  data: Album[] = new Array();
  // keep a temp version of the data for filtering
  dataTemp: Album[] = new Array();
  // keep the original value of the updated object
  originalVal: any;
  // contains all filters on the table
  criteria: any = {};
  // number of filters on the table
  filtersNo: number = 0;
  // if the user submitted the operation in the dialog or not
  submitted: boolean;
  // create or update dialog
  dialog: boolean;
  // a temp object contains the item to be created or updated in the dialog
  item: Album;
  // for the images because we store the url starts from the buplic folder
  baseURL: string = environment.baseURL;
  //#endregion vars init

  constructor(private _albumService: AlbumService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _dataService: DataService, private _route: Router) { }

  ngOnInit(): void {

    this.cols = [
      { header: 'Name', field: 'Name', },
      { header: 'Photo', field: 'Photo', },
      { header: 'Genre', field: 'Genre', },
      { header: 'ReleaseDate', field: 'ReleaseDate', },
      { header: 'Appears In Home Page', field: 'AppearInHomePage', }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._albumService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.data.forEach(rec => {
          rec.ReleaseDate = new Date(rec.ReleaseDate);
        });
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: Album): void {
    this.waiting = true;
    this._albumService
      .update(record)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
        let i = this.data.findIndex(row => row.Id == this.item.Id);
        this.data[i] = res.Data;
        this.data = [...this.data];
        this.dialog = false;
        this.item = new Album();
      }, er => { this.waiting = false; });
  }

  delete(record: Album): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this._albumService
          .delete(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Album) {
    this.submitted = false;
    this.waiting = true;
    this.item = row;
    this._albumService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.item.ReleaseDate = new Date(this.item.ReleaseDate);
        this.waiting = false;
        this.dialog = true;
      }, er => this.waiting = false);
  }

  // cancel inline update operation
  cancel(row: Album) {
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
    this.item = new Album();
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
    if (this.item.Id) {
      this.update(this.item);
    } else {
      this._albumService
        .add(this.item)
        .subscribe(res => {
          this.item.Id = res.Data.Id;
          this.data.push(this.item);
          this.dataTemp.push(this.item);
          this.waiting = false;
          this.dialog = false;
          this.item = new Album();
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

  gtoToSongs(row: Album) {
    this._route.navigate(['dashboard/songs/' + row.Id]);
  }

}
