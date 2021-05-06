import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { Court } from '../models/court';
@Injectable({
  providedIn: 'root'
})
export class CourtService {
  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any>{
    return this.httpClient.get<Court[]>(this.baseUrl+'/courts');
  }

  public getCourt(id:number): Observable<any>{
    return this.httpClient.get<Court>(this.baseUrl+'/courts/'+id.toString());
  }
}
