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

  public createCourt(court:Court): Observable<any>{
    return this.httpClient.post<Court>(this.baseUrl+'/courts',court);
  }

  public updateCourt(id:number,court:Court): Observable<any>{
    return this.httpClient.put<Court>(this.baseUrl+'/courts/'+id.toString(),court);
  }

  public deleteCourt(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl+'/courts/'+id.toString());
  }
}
