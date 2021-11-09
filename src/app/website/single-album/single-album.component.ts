import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SingleAlbum } from '../model/album';
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.less']
})
export class SingleAlbumComponent implements OnInit {

  waiting: boolean = true;
  data: SingleAlbum = new SingleAlbum();
  albumId: string;
  baseURL: string = environment.baseURL;
  defaultTrack: string;
  audioStatus: 'playing' | 'paused' = 'paused';
  @ViewChild('audioElement', { static: false }) audioElement: ElementRef;
  trackIndex: number = 0;


  constructor(private _albumSerrvice: AlbumService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.albumId = this._activatedRoute.snapshot.params.id;
      this.getData();
    })
  }

  getData() {
    this._albumSerrvice
      .get(this.albumId).subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
        this.defaultTrack = this.data.Songs[0]?.Url;
      }, er => this.waiting = false);
  }

  play() {
    this.audioElement?.nativeElement?.play();
    this.audioStatus = 'playing';
  }

  pause() {
    this.audioElement?.nativeElement?.pause();
    this.audioStatus = 'paused';
  }

  playThis(index) {
    this.trackIndex = index;
    this.defaultTrack = this.data.Songs[index].Url;
    this.audioStatus = 'playing';
    this.audioElement?.nativeElement?.play();
  }


}
