import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductReq } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.less']
})
export class AllProductsComponent implements OnInit {

  data: Product[] = new Array();
  params: ProductReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;

  constructor(private _dataService: ProductService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService.getAll(this.params)
      .subscribe(res => {
        this.data.push(...res.Data.List);
        this.totlaCount = +res.Data.TotalCount;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  loadMore() {
    this.params.PageNumber++;
    this.getData();
  }

}
