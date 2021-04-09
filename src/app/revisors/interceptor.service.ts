import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var newRequest = request;
  
    const token = this.tokenService.getToken();

    if( token != null){
      newRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer' + " "+token) })
    }

    return next.handle(newRequest);
  }


}


export const interceptor = [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]

