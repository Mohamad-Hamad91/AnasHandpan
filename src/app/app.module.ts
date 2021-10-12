//#region ng
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//#endregion ng

//#region primeng
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
//#endregion primeng

//#region modules
import { AppRoutingModule } from './app-routing.module';
//#endregion modules

//#region components
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
import { RegisterComponent } from './website/register/register.component';
import { LoginComponent } from './website/login/login.component';
import { VerifyComponent } from './website/verify/verify.component';
//#endregion components

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
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
