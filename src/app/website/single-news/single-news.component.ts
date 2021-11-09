import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SingleNews } from '../model/news';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.less']
})
export class SingleNewsComponent implements OnInit {

  Id: string;
  waiting: boolean = true;
  data: SingleNews = new SingleNews();
  baseURL = environment.baseURL;
  currentPhoto: string;
  currentPhotoIndex = 0;
  currentVideo: string;
  currentVideoIndex = 0;

  constructor(private _dataService: NewsService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(res => {
      this.Id = this._activatedRoute.snapshot.params.id;
      this.getData();
    });
  }

  getData() {
    this.waiting = true;
    this._dataService.get(this.Id)
      .subscribe(res => {
        this.data = res.Data;
        this.currentPhoto = this.data?.Photos[this.currentPhotoIndex];
        this.currentVideo = this.data?.Videos[this.currentVideoIndex];
        this.waiting = false;
      }, er => this.waiting = false);
  }

  prevPhoto() {
    this.currentPhotoIndex++;
    if (this.currentPhotoIndex > (this.data.Photos.length - 1)) this.currentPhotoIndex = 0;
    this.currentPhoto = this.data?.Photos[this.currentPhotoIndex];
  }

  nextPhoto() {
    this.currentPhotoIndex--;
    if (this.currentPhotoIndex < 0) this.currentPhotoIndex = this.data?.Photos?.length - 1;
    this.currentPhoto = this.data?.Photos[this.currentPhotoIndex];
  }

  prevVideo() {
    this.currentVideoIndex++;
    if (this.currentVideoIndex > (this.data.Videos.length - 1)) this.currentVideoIndex = 0;
    this.currentVideo = this.data?.Videos[this.currentVideoIndex];
  }

  nextVideo() {
    this.currentVideoIndex--;
    if (this.currentVideoIndex < 0) this.currentVideoIndex = this.data?.Videos?.length - 1;
    this.currentVideo = this.data?.Videos[this.currentVideoIndex];
  }

}
