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
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { ProductsComponent } from './website/products/products.component';
import { CoursesComponent } from './website/courses/courses.component';
import { SongManagementComponent } from './admin/song-management/song-management.component';
import { ProducPlacesManagementComponent } from './admin/produc-places-management/produc-places-management.component';
import { ProductOrdersManagementComponent } from './admin/product-orders-management/product-orders-management.component';
import { MusicPlayerComponent } from './website/music-player/music-player.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { OrderStatusManagementComponent } from './admin/order-status-management/order-status-management.component';
import { SingleNewsComponent } from './website/single-news/single-news.component';
import { DetailsComponent } from './website/details/details.component';
import { BreadcrumbComponent } from './website/breadcrumb/breadcrumb.component';
import { SingleEventComponent } from './website/single-event/single-event.component';
import { SingleAlbumComponent } from './website/single-album/single-album.component';
import { SingleCourseComponent } from './website/single-course/single-course.component';
import { AllNewsComponent } from './website/all-news/all-news.component';
import { AllEventsComponent } from './website/all-events/all-events.component';
import { AllAlbumsComponent } from './website/all-albums/all-albums.component';
import { AllProductsComponent } from './website/all-products/all-products.component';
import { SingleProductComponent } from './website/single-product/single-product.component';
import { MyOrdersComponent } from './website/my-orders/my-orders.component';
import { MyCoursesComponent } from './website/my-courses/my-courses.component';
import { AllCoursesComponent } from './website/all-courses/all-courses.component';
import { ProfileComponent } from './website/profile/profile.component';
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
    EventManagementComponent,
    ProductManagementComponent,
    ProductsComponent,
    CoursesComponent,
    SongManagementComponent,
    ProducPlacesManagementComponent,
    ProductOrdersManagementComponent,
    MusicPlayerComponent,
    OrderManagementComponent,
    OrderStatusManagementComponent,
    SingleNewsComponent,
    DetailsComponent,
    BreadcrumbComponent,
    SingleEventComponent,
    SingleAlbumComponent,
    SingleCourseComponent,
    AllNewsComponent,
    AllEventsComponent,
    AllAlbumsComponent,
    AllProductsComponent,
    SingleProductComponent,
    MyOrdersComponent,
    MyCoursesComponent,
    AllCoursesComponent,
    ProfileComponent
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
    CalendarModule,
    FileUploadModule,
    InputTextareaModule
  ],
  providers: [MessageService, ConfirmationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: SessionInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
