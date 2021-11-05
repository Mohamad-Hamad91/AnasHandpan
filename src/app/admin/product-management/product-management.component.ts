import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Product, ProductReq } from '../model/product';
import { TableColumn } from '../model/tableColumn';
import { DataService } from '../service/data.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.less']
})
export class ProductManagementComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: ProductReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  data: Product[] = new Array();
  dataTemp: Product[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Product;
  baseURL: string = environment.baseURL;
  photosDialog: boolean;

  constructor(private _productService: ProductsService, private confirmationService: ConfirmationService,
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
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._productService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: Product): void {
    this.waiting = true;
    this._productService
      .update(record)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
        let i = this.data.findIndex(row => row.Id == this.item.Id);
        this.data[i] = res.Data;
        this.data = [...this.data];
        this.item = new Product();
        this.dialog = false;
        this.photosDialog = false;
      }, er => { this.waiting = false; });
  }

  delete(record: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._productService
          .delete(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Product) {
    this.submitted = false;
    this.waiting = true;
    this.item = row;
    this._productService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.waiting = false;
        this.dialog = true;
      }, er => this.waiting = false);
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
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    this.getData();
  }

  openNew() {
    this.item = new Product();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  hidePhotosDialog() {
    this.photosDialog = false;
    this.submitted = false;
  }


  save() {
    this.submitted = true;
    this.waiting = true;
    const temp: any = { ...this.item };
    temp.Price = temp.Price.toString();
    if (this.item.Id) {
      this.update(temp);
    } else {
      this._productService
        .add(temp)
        .subscribe(res => {
          this.item.Id = res.Data.Id;
          this.data.push(this.item);
          this.dataTemp.push(this.item);
          this.waiting = false;
          this.dialog = false;
          this.item = new Product();
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

  onUploadPhoto(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Photos.push(res.Data.Url);
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  managePhotos(row: Product) {
    this.submitted = false;
    this.waiting = true;
    this._productService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.photosDialog = true;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  deletePhoto(index: number) {
    this.item.Photos = [...this.item.Photos.filter((rec, i) => i != index)];
  }

  goToPlaces(row: Product) {
    this._route.navigate(['dashboard/places/' + row.Id]);
  }


  goToOrders(row: Product) {
    this._route.navigate(['dashboard/orders/' + row.Id]);
  }

}
