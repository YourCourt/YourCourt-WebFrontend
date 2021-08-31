import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './services/toast.service';
import { TokenService } from './services/token.service';
import * as appUtils from 'src/app/appUtils';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'yourcourt';

  constructor(
    private tokenService: TokenService,
    private toastService: ToastService,
    private router: Router
  ) {}

  private expiredToken(token: string): boolean {
    let payload: string = token.split('.')[1];
    const expirationTime = JSON.parse(atob(payload)).exp; //Converts to JSON the payload, getting 3 attributes, Subject, Issued at (when it was emitted) and Expiration time (which is the important here)
    let nowDateSeconds: number = new Date().getTime() / 1000;
    return Math.floor(nowDateSeconds) >= expirationTime;
  }

  ngOnInit() {
    if (
      this.tokenService.getToken() &&
      this.expiredToken(this.tokenService.getToken())
    ) {
      appUtils.showDanger(this.toastService, 'Sesión expirada');
      this.tokenService.logOut();
      appUtils.promiseReload(this.router, '/', 2000);
    }

    AOS.init({
      offset: 30,
      duration: 1500,
    });
  }
}
