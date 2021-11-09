import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../model/home';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  data: Home = new Home();

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
    this._dataService.get().subscribe(res => this.data = res.Data);
  }

  navigateTo(element: string) {
    this._router.navigate(['/home/' + element]);
    // this[element].nativeElement.scrollIntoView({ behavior: "smooth" });
  }

}
