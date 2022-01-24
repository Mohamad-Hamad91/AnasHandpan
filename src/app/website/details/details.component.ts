import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../model/home';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  @ViewChild('player') player;
  data: Home = new Home();

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
    let loader = document.getElementById('page-loader');
    loader.style.display = 'none';
    this._dataService.get().subscribe(res => this.data = res.Data);
  }

  navigateTo(element: string) {
    this._router.navigate(['/home/' + element]);
    // this[element].nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

}
