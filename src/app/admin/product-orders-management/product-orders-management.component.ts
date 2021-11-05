import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { TableColumn } from '../model/tableColumn';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-orders-management',
  templateUrl: './product-orders-management.component.html',
  styleUrls: ['./product-orders-management.component.less']
})
export class ProductOrdersManagementComponent implements OnInit {

  productId: string;
  waiting: boolean = true;
  data: Product = new Product();
  dataTemp: Product = new Product();
  cols: TableColumn[] = new Array();
  criteria: any = {};
  filtersNo: number = 0;
  baseURL: string = environment.baseURL;

  constructor(private _productService: ProductsService, private _route: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.productId = this._activatedRoute.snapshot.params.id;
      this.getData();
    });

    this.cols = [
      { header: 'Product Title', field: 'ProductTitle' },
      { header: 'Product Photo', field: 'ProductPhoto' },
      { header: 'Product Price', field: 'ProductPrice' },
      { header: 'User Name', field: 'UserFullName' },
      { header: 'User Email', field: 'UserEmail' },
      { header: 'User Phone', field: 'UserPhone' },
      { header: 'Date', field: 'Date' },
      { header: 'LastOrderStatusDate', field: 'LastOrderStatusDate' },
      { header: 'LastOrderStatusTitle', field: 'LastOrderStatusTitle' },
    ];
  }

  getData() {
    this.waiting = true;
    this._productService.getOne(this.productId)
      .subscribe(res => {
        this.data = res.Data;
        this.dataTemp.Orders.List = [...res.Data?.Orders?.List];
        this.waiting = false;
      }, er => this.waiting = false);
  }

  filterChange(query, colName) {
    this.waiting = true;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.data.Orders.List = [...this.dataTemp.Orders.List];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data.Orders.List = this.dataTemp.Orders?.List?.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data.Orders.List = [...this.dataTemp.Orders?.List];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data.Orders.List = this.data?.Orders?.List?.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data.Orders.List = [...this.dataTemp.Orders?.List];
    this.filtersNo = 0;
  }


}
