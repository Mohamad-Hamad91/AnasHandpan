import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Home } from '../model/home';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('Courses', { static: false }) Courses;
  @ViewChild('MyCourses', { static: false }) MyCourses;
  @ViewChild('Products', { static: false }) Products;
  @ViewChild('MyOrders', { static: false }) MyOrders;
  @ViewChild('Albums', { static: false }) Albums;
  @ViewChild('Events', { static: false }) Events;
  @ViewChild('News', { static: false }) News;

  data: Home = new Home();
  section: string;

  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._dataService.get().subscribe(res => {
      this.data = res.Data;
      setTimeout(() => {
        this.section = this._activatedRoute.snapshot.params.section;
        if (this.section && this.section.trim()) this.navigateTo(this.section);
      }, 500);
    });
  }

  navigateTo(element: string) {
    this[element].nativeElement.scrollIntoView({ behavior: "smooth" });
  }

}
