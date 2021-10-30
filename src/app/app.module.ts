//#region ng
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//#endregion ng

//#region primeng
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
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
import { ForgetPassComponent } from './website/forget-pass/forget-pass.component';
import { ForgetPassCodeComponent } from './website/forget-pass-code/forget-pass-code.component';
import { LogoutComponent } from './website/logout/logout.component';
import { SessionInterceptor } from './session.interceptor';
import { AdminsComponent } from './admin/admins/admins.component';
import { UsersComponent } from './admin/users/users.component';
import { SocialMediaComponent } from './admin/social-media/social-media.component';
import { SectionsComponent } from './admin/sections/sections.component';
import { CoverManagementComponent } from './admin/cover-management/cover-management.component';
import { PersonalInfoManagementComponent } from './admin/personal-info-management/personal-info-management.component';
import { MusicManagementComponent } from './admin/music-management/music-management.component';
import { AlbumsManagementComponent } from './admin/albums-management/albums-management.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { LessonManagementComponent } from './admin/lesson-management/lesson-management.component';
import { EnrollmentManagementComponent } from './admin/enrollment-management/enrollment-management.component';
import { NewsManagementComponent } from './admin/news-management/news-management.component';
import { EventManagementComponent } from './admin/event-management/event-management.component';
//#endregion components

//#region Other

//#endregion Other
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
    ForgetPassComponent,
    ForgetPassCodeComponent,
    LogoutComponent,
    AdminsComponent,
    UsersComponent,
    SocialMediaComponent,
    SectionsComponent,
    CoverManagementComponent,
    PersonalInfoManagementComponent,
    MusicManagementComponent,
    AlbumsManagementComponent,
    CourseManagementComponent,
    LessonManagementComponent,
    EnrollmentManagementComponent,
    NewsManagementComponent,
    EventManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressBarModule,
    TableModule,
    DropdownModule,
    PaginatorModule,
    ToolbarModule,
    InputSwitchModule,
    CalendarModule
  ],
  providers: [MessageService, ConfirmationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: SessionInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
