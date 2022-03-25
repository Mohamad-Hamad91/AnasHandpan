import { Component, Input, OnInit } from '@angular/core';
import { Events } from '../model/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

  @Input('data') data: Events[] = new Array();
  
  constructor() { }

  ngOnInit(): void {
    console.table(this.data);
    
  }

}
