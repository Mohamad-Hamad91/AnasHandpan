import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cover } from '../model/home';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.less']
})
export class CoverComponent implements OnInit {

  @Input('data') data: Cover = new Cover();
  baseURL = environment.baseURL;
  videoURL = 'bmzXk5E4gAs';
  dataProperty="{videoURL:'bmzXk5E4gAs',containment:'.player',autoPlay:true, mute:true, startAt:0, opacity:1}";

  constructor() { }

  ngOnInit(): void {
    const videoEl:HTMLElement = document.getElementById('bgndVideo');
    videoEl.setAttribute('data-property', this.dataProperty);
  }

}
