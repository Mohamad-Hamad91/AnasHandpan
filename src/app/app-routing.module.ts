import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { AlbumsManagementComponent } from './admin/albums-management/albums-management.component';
import { ContactInfoManagementComponent } from './admin/contact-info-management/contact-info-management.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
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
import { AuthGaurdGuard } from './auth-gaurd.guard';
import { AllAlbumsComponent } from './website/all-albums/all-albums.component';
import { AllCoursesComponent } from './website/all-courses/all-courses.component';
import { AllEventsComponent } from './website/all-events/all-events.component';
import { AllNewsComponent } from './website/all-news/all-news.component';
import { AllProductsComponent } from './website/all-products/all-products.component';
import { BiographyComponent } from './website/biography/biography.component';
import { ContactComponent } from './website/contact/contact.component';
import { DetailsComponent } from './website/details/details.component';
import { ForgetPassCodeComponent } from './website/forget-pass-code/forget-pass-code.component';
import { ForgetPassComponent } from './website/forget-pass/forget-pass.component';
import { HomeComponent } from './website/home/home.component';
import { LoginComponent } from './website/login/login.component';
import { LogoutComponent } from './website/logout/logout.component';
import { MyCoursesComponent } from './website/my-courses/my-courses.component';
import { MyOrdersComponent } from './website/my-orders/my-orders.component';
import { ProfileComponent } from './website/profile/profile.component';
import { RegisterComponent } from './website/register/register.component';
import { SingleAlbumComponent } from './website/single-album/single-album.component';
import { SingleCourseComponent } from './website/single-course/single-course.component';
import { SingleEventComponent } from './website/single-event/single-event.component';
import { SingleLessonComponent } from './website/single-lesson/single-lesson.component';
import { SingleNewsComponent } from './website/single-news/single-news.component';
import { SingleProductComponent } from './website/single-product/single-product.component';
import { VerifyComponent } from './website/verify/verify.component';

const routes: Routes = [
  //#region website section
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:section', component: HomeComponent },
  { path: 'Biography', component: BiographyComponent },
  {
    path: 'details', component: DetailsComponent, children: [
      { path: 'Profile', component: ProfileComponent },
      { path: 'MyOrders', component: MyOrdersComponent },
      { path: 'MyCourses', component: MyCoursesComponent },
      { path: 'News', component: AllNewsComponent },
      { path: 'Events', component: AllEventsComponent },
      { path: 'Albums', component: AllAlbumsComponent },
      { path: 'Products', component: AllProductsComponent },
      { path: 'Courses', component: AllCoursesComponent },
      { path: 'single-news/:id', component: SingleNewsComponent },
      { path: 'single-event/:id', component: SingleEventComponent },
      { path: 'single-album/:id', component: SingleAlbumComponent },
      { path: 'single-product/:id', component: SingleProductComponent },
      { path: 'single-course/:id', component: SingleCourseComponent },
      { path: 'single-lesson/:id', component: SingleLessonComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPassComponent },
  { path: 'forget-password-code', component: ForgetPassCodeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'contact', component: ContactComponent,
  //  canActivate: [AuthGaurdGuard]
},

  //#endregion website section

  //#region Admin section
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'admins', component: AdminsComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'users', component: UsersComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'cover', component: CoverManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'personal-info', component: PersonalInfoManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'sections', component: SectionsComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'contact-info', component: ContactInfoManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'contact', component: ContactManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'social-media', component: SocialMediaComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'music', component: MusicManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'albums', component: AlbumsManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'songs/:id', component: SongManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'news', component: NewsManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'events', component: EventManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1', '2'] }
      },
      {
        path: 'courses', component: CourseManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'lessons/:id', component: LessonManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'enrollment/:id', component: EnrollmentManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'products', component: ProductManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'places/:id', component: ProducPlacesManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'orders/:id', component: ProductOrdersManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'orders-management', component: OrderManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
      {
        path: 'orders-status/:id', component: OrderStatusManagementComponent, canActivate: [AuthGaurdGuard],
        data: { roles: ['1'] }
      },
    ]
  },
  //#endregion Admin section
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
