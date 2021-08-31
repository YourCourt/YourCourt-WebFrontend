import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser, UpdateUser } from '../models/user-dto';
import { User } from '../models/user';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = environment.backendEndpoint + '/auth'
  users = environment.backendEndpoint + '/users'
  //auth='http://localhost:50482/auth/';
  //auth = 'http://localhost:8080/auth/'
  constructor(private httpClient: HttpClient) { }



  public new(newUser: NewUser): Observable<any> {
    var req = this.httpClient.post<NewUser>(this.users, newUser);
    return req
  }

  public update(updateUser: UpdateUser,id:number): Observable<any> {
    var req = this.httpClient.put<UpdateUser>(this.users+'/'+id.toString(), updateUser);
    return req
  }

  public login(loginUser: LoginUser): Observable<any> {
    var req = this.httpClient.post<JwtDto>(this.auth + '/login', loginUser);
    return req
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get<User[]>(this.users);
  }

  public showUser(username: string): Observable<any> {
    return this.httpClient.get<User>(this.users + '/username/' + username);
  }

  public showUserById(id: number): Observable<any> {
    return this.httpClient.get<User>(this.users + '/' + id.toString());
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.users + '/' + id.toString());
  }



}
