import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourtListComponent } from './components/court/court-list/court-list.component';
import { CourtShowComponent } from './components/court/court-show/court-show.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  
  {path:'registro',component: RegisterComponent,pathMatch: 'full'},
  {path:'acceso',component: LoginComponent,pathMatch: 'full'},
  {path:'pistas',component: CourtListComponent,pathMatch: 'full'},
  {path:'pistas/:id',component: CourtShowComponent,pathMatch: 'full'},
  {path:'',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
