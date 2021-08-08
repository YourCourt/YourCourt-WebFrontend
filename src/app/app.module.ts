import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { interceptor } from './revisors/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourtListComponent } from './components/court/court-list/court-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CourtShowComponent } from './components/court/court-show/court-show.component';
import { CourtCreateComponent } from './components/court/court-create/court-create.component';
import { CourtUpdateComponent } from './components/court/court-update/court-update.component';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import { BookingCreateComponent } from './components/booking/booking-create/booking-create.component';
import { BookingShowComponent } from './components/booking/booking-show/booking-show.component';
import { ToastComponent } from './components/toast/toast.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductShowComponent } from './components/product/product-show/product-show.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseUpdateComponent } from './components/course/course-update/course-update.component';
import { CourseShowComponent } from './components/course/course-show/course-show.component';
import { InscriptionShowComponent } from './components/inscription/inscription-show/inscription-show.component';
import { InscriptionUpdateComponent } from './components/inscription/inscription-update/inscription-update.component';
import { NewsCreateComponent } from './components/news/news-create/news-create.component';
import { NewsShowComponent } from './components/news/news-show/news-show.component';
import { NewsUpdateComponent } from './components/news/news-update/news-update.component';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { CartComponent } from './components/purchase/cart/cart.component';
import { PurchaseShowComponent } from './components/purchase/purchase-show/purchase-show.component';
import { AboutComponent } from './components/about/about.component';
import { FacilityCreateComponent } from './components/facility/facility-create/facility-create.component';
import { FacilityListComponent } from './components/facility/facility-list/facility-list.component';
import { FacilityShowComponent } from './components/facility/facility-show/facility-show.component';
import { FacilityUpdateComponent } from './components/facility/facility-update/facility-update.component';


registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    CourtListComponent,
    CourtShowComponent,
    CourtCreateComponent,
    CourtUpdateComponent,
    BookingCreateComponent,
    BookingShowComponent,
    ToastComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductShowComponent,
    ProductUpdateComponent,
    ProfileComponent,
    CourseCreateComponent,
    CourseListComponent,
    CourseUpdateComponent,
    CourseShowComponent,
    InscriptionShowComponent,
    InscriptionUpdateComponent,
    NewsCreateComponent,
    NewsShowComponent,
    NewsUpdateComponent,
    NewsListComponent,
    CartComponent,
    PurchaseShowComponent,
    AboutComponent,
    FacilityCreateComponent,
    FacilityListComponent,
    FacilityShowComponent,
    FacilityUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    FormsModule, ReactiveFormsModule,
    NgbModule,NgbPaginationModule, NgbAlertModule,
    FlexLayoutModule,

  ],
  providers: [interceptor,DatePipe ,{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
