import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SingleLesson } from '../model/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.less']
})
export class SingleLessonComponent implements OnInit {

  private lessonId: string;
  data: SingleLesson = new SingleLesson();
  baseURL = environment.baseURL;
  @ViewChild("videoElement") video: ElementRef;
  mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  ready: boolean = false;

  constructor(private _dataService: CourseService, private _route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this._route.params.subscribe(r => {
      this.lessonId = this._route.snapshot.params.id;
      this.getData();
    })
  }

  getData() {
    this._dataService.getLesson(this.lessonId)
      .subscribe(res => {
        this.data = res.Data;
        if (
          "MediaSource" in window &&
          MediaSource.isTypeSupported(this.mimeCodec)
        ) {
          const mediaSource = new MediaSource();
          (this.video.nativeElement as HTMLVideoElement).src = URL.createObjectURL(mediaSource);
          this.ready = true;
          mediaSource.addEventListener("sourceopen", () => {
            this.sourceOpen(mediaSource);
            console.log('Source opened');

          });
        } else {
          console.error("Unsupported MIME type or codec: ", this.mimeCodec);
        }
      });
  }

  ngAfterViewInit() {

  }

  sourceOpen(mediaSource: MediaSource) {
    let sourceBuffer = mediaSource.addSourceBuffer(this.mimeCodec);
    const SID = localStorage.getItem('sID');
    const headers = new HttpHeaders({ auth: `${SID}` });
    const url = this.baseURL + this.data.Video;
    return this.http
      .get(url, {
        headers,
        responseType: "blob"
      })
      .subscribe(async (blob) => {
        console.log('get buffer');
        this.video.nativeElement.src = URL.createObjectURL(blob);
        // sourceBuffer.addEventListener("updateend", () => {
        // mediaSource.endOfStream();
        // this.video.nativeElement.play();
        // });
        // blob.arrayBuffer().then(x => sourceBuffer.appendBuffer(x));
        // sourceBuffer.appendBuffer((await blob.arrayBuffer()));
      });
  }

}
