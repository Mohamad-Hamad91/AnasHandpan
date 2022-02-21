import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../model/home';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.less']
})
export class BiographyComponent implements OnInit {

  data: Home = new Home();

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {

    this._dataService.get().subscribe(res => {
      this.data = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
  }

}
