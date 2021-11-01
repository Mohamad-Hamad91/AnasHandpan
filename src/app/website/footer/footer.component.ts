import { Component, Input, OnInit } from '@angular/core';
import { SocialLinks } from '../model/socialLinks';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  @Input('data') data: SocialLinks[] = new Array();

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scroll(0,0);
  }

}
