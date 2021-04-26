import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { GetUser } from '../models/get-user';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = environment.backendEndpoint+'/auth'
  users = environment.backendEndpoint+'/users'
  //auth='http://localhost:50482/auth/';
  //auth = 'http://localhost:8080/auth/'
  constructor(private httpClient: HttpClient) { }

  public new(newUser: NewUser): Observable<any>{
    var req=this.httpClient.post<NewUser>(this.users, newUser);
    return req
  }

  public login(loginUser: LoginUser): Observable<any>{
    var req=this.httpClient.post<JwtDto>(this.auth + '/login', loginUser);
    return req
    //return this.httpClient.get<JwtDto>(this.auth+'login');
  }

  public showUser(username: String): Observable<any>{
    return this.httpClient.get<GetUser>(this.users+'/'+username);
  }



}
