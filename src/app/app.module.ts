import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './website/top-header/top-header.component';
import { FooterComponent } from './website/footer/footer.component';
import { HomeComponent } from './website/home/home.component';
import { CoverComponent } from './website/cover/cover.component';
import { AlbumsComponent } from './website/albums/albums.component';
import { EventsComponent } from './website/events/events.component';
import { NewsComponent } from './website/news/news.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    FooterComponent,
    HomeComponent,
    CoverComponent,
    AlbumsComponent,
    EventsComponent,
    NewsComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
