import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { ToastService } from 'src/app/services/toast.service';

const CART_KEY = 'CartProducts';

@Component({
  selector: 'yourcourt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private toastService: ToastService,
    private router: Router
  ) { }

  isLogged: boolean = false;
  loggedUsername: string;

  cartLength:number=0;
  isOdd: boolean;

  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.loggedUsername = this.tokenService.getUsername();
      
      if (localStorage.getItem(CART_KEY)) {
        this.getCartLength();
      }
    }
  }
  logOut(): void {
    localStorage.clear();
    this.tokenService.logOut();
    appUtils.showSuccess(this.toastService, 'Desconectado');
    appUtils.promiseReload(this.router, '/', 500);
  }

  goHome(){
    appUtils.promiseReload(this.router, '/', 0);
  }

  getCartLength(){
    if(localStorage.getItem(CART_KEY)){
      this.cartLength=JSON.parse(localStorage.getItem(CART_KEY)).length;
    }else{
      this.cartLength=0;
    }
  }



}
