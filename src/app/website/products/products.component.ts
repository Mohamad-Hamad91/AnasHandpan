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
  
  constructor() { }

  ngOnInit(): void {
  }

}
