import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cover } from '../model/home';
import * as jQuery from 'jquery';
// import * as YTPlayer from '@ibrahim-addandan/ytp';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.less']
})
export class CoverComponent implements OnInit {

  @Input('data') data: Cover = new Cover();
  baseURL = environment.baseURL;
  videoURL: string;
  dataProperty: string;
  title: string;;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title = 'ANAS';
  }

  changeData(data) {
    // debugger;
    this.data = data;
    this.videoURL = this.data.CoverPhoto;
    let videoEl: any = jQuery('#bgndVideo')[0];
    this.dataProperty = `{videoURL:'${this.videoURL}',containment:'.player',autoPlay:true, mute:true, startAt:0, opacity:1}`;
    videoEl.setAttribute('data-property', this.dataProperty);
    let e = new Event('just_ready');
    document.dispatchEvent(e);
    videoEl = jQuery('#bgndVideo')[0];
    // debugger;
    // videoEl.YTPChangeMovie(this.dataProperty);
    videoEl.videoID = this.videoURL;
    videoEl.player.loadVideoById(this.videoURL);
    // this.ref.detectChanges();

  }

}
