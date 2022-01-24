import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  @Input('data') data: Product[] = new Array();
  baseURL: string = environment.baseURL;
  floor = Math.floor;
  offset: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.offset = (this.data.length > 2 || window.innerWidth < 1000) ? 0 : this.data.length == 2 ? 11.5 : 33;
  }

}
