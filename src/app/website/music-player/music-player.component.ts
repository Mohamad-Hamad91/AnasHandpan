import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Music } from '../model/music';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements OnInit {

  @Input('data') data: Music[] = new Array();
  @ViewChild('audioElement', { static: false }) audioElement: ElementRef;
  baseURL = environment.baseURL;
  defaultTrack: Music = new Music();
  hidden: boolean = true;
  playListHidden: boolean = true;
  audioStatus: 'playing' | 'paused' = 'paused';
  trackIndex: number = 0;
  duration: number;
  currentTime: number = 0;
  floor = Math.floor;
  isNan = isNaN;
  currentPercent: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.defaultTrack = this.data[0];
    setInterval(() => {
      this.duration = this.audioElement.nativeElement.duration;
      this.currentTime = this.audioElement.nativeElement.currentTime;
      this.currentPercent = (this.currentTime / this.duration) * 100;
      if(this.audioElement.nativeElement.readyState == 4 && this.audioStatus == 'playing')
      this.audioElement.nativeElement.play();
    }, 1000);
  }

  hideClicked() {
    if (this.hidden)
      document.getElementById('main-music-player')?.classList?.remove('hide-player');
    else
      document.getElementById('main-music-player')?.classList?.add('hide-player');
    this.hidden = !this.hidden;
  }

  openPlayList() {
    if (this.playListHidden) document.body.classList.add('opacityPlaylist');
    else document.body.classList.remove('opacityPlaylist');
    this.playListHidden = !this.playListHidden;
  }

  play() {
    this.audioElement?.nativeElement?.play();
    this.duration = this.audioElement.nativeElement.duration;
    this.audioStatus = 'playing';
  }

  pause() {
    this.audioElement?.nativeElement?.pause();
    this.audioStatus = 'paused';
  }

  backward() {
    this.trackIndex--;
    if (this.trackIndex < 0) this.trackIndex = this.data.length - 1;
    this.defaultTrack = this.data[this.trackIndex];
    this.duration = this.audioElement.nativeElement.duration;
    // this.audioElement?.nativeElement?.play();
  }

  forward() {
    this.trackIndex++;
    if (this.trackIndex > (this.data.length - 1)) this.trackIndex = 0;
    this.defaultTrack = this.data[this.trackIndex];
    this.duration = this.audioElement.nativeElement.duration;
    // this.audioElement?.nativeElement?.play();
  }

  playThis(index) {
    this.trackIndex = index;
    this.defaultTrack = this.data[index];
    this.audioStatus = 'playing';
    this.duration = this.audioElement.nativeElement.duration;
    // this.audioElement?.nativeElement?.play();
  }

}
