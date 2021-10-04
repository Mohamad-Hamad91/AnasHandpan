import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './website/top-header/top-header.component';
import { FooterComponent } from './website/footer/footer.component';
import { HomeComponent } from './website/home/home.component';
import { CoverComponent } from './website/cover/cover.component';
import { AlbumsComponent } from './website/albums/albums.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    FooterComponent,
    HomeComponent,
    CoverComponent,
    AlbumsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
