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
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductShowComponent } from './components/products/product-show/product-show.component';
import { ProductUpdateComponent } from './components/products/product-update/product-update.component';


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
    ProductUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    NgbPaginationModule, NgbAlertModule,
    FlexLayoutModule,

  ],
  providers: [interceptor,DatePipe ,{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
