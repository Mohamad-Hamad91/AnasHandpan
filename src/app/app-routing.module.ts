import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { AlbumsManagementComponent } from './admin/albums-management/albums-management.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { CoverManagementComponent } from './admin/cover-management/cover-management.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EnrollmentManagementComponent } from './admin/enrollment-management/enrollment-management.component';
import { EventManagementComponent } from './admin/event-management/event-management.component';
import { LessonManagementComponent } from './admin/lesson-management/lesson-management.component';
import { MusicManagementComponent } from './admin/music-management/music-management.component';
import { NewsManagementComponent } from './admin/news-management/news-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { OrderStatusManagementComponent } from './admin/order-status-management/order-status-management.component';
import { PersonalInfoManagementComponent } from './admin/personal-info-management/personal-info-management.component';
import { ProducPlacesManagementComponent } from './admin/produc-places-management/produc-places-management.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { ProductOrdersManagementComponent } from './admin/product-orders-management/product-orders-management.component';
import { SectionsComponent } from './admin/sections/sections.component';
import { SocialMediaComponent } from './admin/social-media/social-media.component';
import { SongManagementComponent } from './admin/song-management/song-management.component';
import { UsersComponent } from './admin/users/users.component';
import { AllNewsComponent } from './website/all-news/all-news.component';
import { DetailsComponent } from './website/details/details.component';
import { ForgetPassCodeComponent } from './website/forget-pass-code/forget-pass-code.component';
import { ForgetPassComponent } from './website/forget-pass/forget-pass.component';
import { HomeComponent } from './website/home/home.component';
import { LoginComponent } from './website/login/login.component';
import { LogoutComponent } from './website/logout/logout.component';
import { RegisterComponent } from './website/register/register.component';
import { SingleAlbumComponent } from './website/single-album/single-album.component';
import { SingleCourseComponent } from './website/single-course/single-course.component';
import { SingleEventComponent } from './website/single-event/single-event.component';
import { SingleNewsComponent } from './website/single-news/single-news.component';
import { VerifyComponent } from './website/verify/verify.component';

const routes: Routes = [
  //#region website section
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:section', component: HomeComponent },
  {
    path: 'details', component: DetailsComponent, children: [
      { path: 'all-news', component: AllNewsComponent },
      { path: 'single-news/:id', component: SingleNewsComponent },
      { path: 'single-event/:id', component: SingleEventComponent },
      { path: 'single-album/:id', component: SingleAlbumComponent },
      { path: 'single-course/:id', component: SingleCourseComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPassComponent },
  { path: 'forget-password-code', component: ForgetPassCodeComponent },
  { path: 'logout', component: LogoutComponent },
  //#endregion website section

  //#region Admin section
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'admins', component: AdminsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'cover', component: CoverManagementComponent },
      { path: 'personal-info', component: PersonalInfoManagementComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'social-media', component: SocialMediaComponent },
      { path: 'music', component: MusicManagementComponent },
      { path: 'albums', component: AlbumsManagementComponent },
      { path: 'songs/:id', component: SongManagementComponent },
      { path: 'news', component: NewsManagementComponent },
      { path: 'events', component: EventManagementComponent },
      { path: 'courses', component: CourseManagementComponent },
      { path: 'lessons/:id', component: LessonManagementComponent },
      { path: 'enrollment/:id', component: EnrollmentManagementComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'places/:id', component: ProducPlacesManagementComponent },
      { path: 'orders/:id', component: ProductOrdersManagementComponent },
      { path: 'orders-management', component: OrderManagementComponent },
      { path: 'orders-status/:id', component: OrderStatusManagementComponent },
    ]
  },
  //#endregion Admin section
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
