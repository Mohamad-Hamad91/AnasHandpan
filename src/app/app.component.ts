import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'anas-ui';

  constructor(private bnIdle: BnNgIdleService, private _router: Router) { }

  ngOnInit() {
    this.bnIdle.startWatching(10800).subscribe((isTimedOut: boolean) => {
        console.log('session expired');
        localStorage.clear();
        this._router.navigate(['/']);
    });
  }

}
