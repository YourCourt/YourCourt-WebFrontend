import { Router } from '@angular/router';
import { User } from './models/user';
import { ToastService } from './services/toast.service';
import { TokenService } from './services/token.service';

export function reload():void {
  window.location.reload();
}

export function promiseReload(
  router: Router,
  navigation: string,
  timeout: number
):Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        router.navigate([navigation]).then(() => {
          reload();
        })
      );
    }, timeout);
  });
}

export function redirect(router: Router, navigation: string):void {
  router.navigate([navigation]);
}

export function redirectParams(router: Router, navigation: string, params):void {
  router.navigate([navigation], {
    queryParams: params,
    skipLocationChange: true,
    replaceUrl: true,
  }); //, skipLocationChange: true }
}

export function addZeroBeforeNumber(number: number):string {
  return ('0' + number).slice(-2);
}

export const LOW_STOCK: number = 20;
export const MAXIMUM_CART_SIZE: number = 10;

export function showSuccess(toastService: ToastService, successText: string):void {
  toastService.show(successText, {
    classname: 'bg-success text-light',
    delay: 5000,
    headertext: '¡Éxito!',
  });
}

export function showDanger(toastService: ToastService, dangerText: string):void {
  toastService.show(dangerText, {
    classname: 'bg-danger text-light',
    delay: 5000,
    autohide: true,
    headertext: '¡Error!',
  });
}

export function showCustomToast(toastService: ToastService, text: string, header: string):void {
  toastService.show(text, {
    classname: 'bg-info text-light',
    delay: 5000,
    autohide: true,
    headertext: header,
  });
}

export function showErrorMessages(httpResponse: any, toastService: ToastService):void {
  if (httpResponse.error && httpResponse.status != 0) {
    for (var text in httpResponse.error) {
      showDanger(toastService, httpResponse.error[text]);
    }
  } else {
    showDanger(toastService, 'Error desconocido');
  }
}

export function isAdminUser(tokenService:TokenService):boolean{
  return tokenService.getAuthorities().includes('ROLE_ADMIN')
}

export function isObjectOwner(loggedUser:User, objectUser:User):boolean{
  return loggedUser===objectUser;
}