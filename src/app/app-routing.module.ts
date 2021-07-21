import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingCreateComponent } from './components/booking/booking-create/booking-create.component';
import { BookingShowComponent } from './components/booking/booking-show/booking-show.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseShowComponent } from './components/course/course-show/course-show.component';
import { CourseUpdateComponent } from './components/course/course-update/course-update.component';
import { CourtCreateComponent } from './components/court/court-create/court-create.component';
import { CourtListComponent } from './components/court/court-list/court-list.component';
import { CourtShowComponent } from './components/court/court-show/court-show.component';
import { CourtUpdateComponent } from './components/court/court-update/court-update.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionShowComponent } from './components/inscription/inscription-show/inscription-show.component';
import { InscriptionUpdateComponent } from './components/inscription/inscription-update/inscription-update.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductShowComponent } from './components/product/product-show/product-show.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import {PermissionsService as guard } from './revisors/permissions.service';

const routes: Routes = [
  
  {path:'registro',component: RegisterComponent,pathMatch: 'full'},
  {path:'acceso',component: LoginComponent,pathMatch: 'full'},
  {path:'usuario/:username',component: ProfileComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin','user']}},
  {path:'pistas',component: CourtListComponent,pathMatch: 'full'},
  {path:'pistas/crear',component: CourtCreateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'pistas/:id',component: CourtShowComponent,pathMatch: 'full'},
  {path:'pistas/editar/:id',component: CourtUpdateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'reservas/crear',component: BookingCreateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin','user'] }},
  {path:'reservas/:id',component: BookingShowComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin','user']}},
  {path:'productos',component: ProductListComponent,pathMatch: 'full'},
  {path:'productos/crear',component: ProductCreateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'productos/:id',component: ProductShowComponent,pathMatch: 'full'},
  {path:'productos/editar/:id',component: ProductUpdateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'cursos/crear',component: CourseCreateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'cursos',component: CourseListComponent,pathMatch: 'full'},
  {path:'cursos/:id',component: CourseShowComponent,pathMatch: 'full'},
  {path:'cursos/editar/:id',component: CourseUpdateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'inscripciones/:id',component: InscriptionShowComponent,pathMatch: 'full'},
  {path:'inscripciones/editar/:id',component: InscriptionUpdateComponent,pathMatch: 'full', canActivate: [guard], data: { expectedRol:['admin'] }},
  {path:'',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
