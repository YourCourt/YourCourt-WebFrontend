import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course, Inscription } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAllInscriptions(): Observable<any> {
    return this.httpClient.get<Inscription[]>(this.baseUrl + '/inscriptions');
  }

  public getAllInscriptionsByUsername(username: string): Observable<any> {
    return this.httpClient.get<Inscription[]>(this.baseUrl + '/inscriptions/user/' + username);
  }

  public createInscription(inscription: Inscription, courseId: number): Observable<any> {
    return this.httpClient.post<Inscription>(this.baseUrl + '/inscriptions/course/' + courseId.toString(), inscription);
  }

  public updateInscription(inscription: Inscription, courseId: number): Observable<any> {
    return this.httpClient.put<Inscription>(this.baseUrl + '/inscriptions/course/' + courseId.toString(), inscription);
  }

  public getInscription(id: number): Observable<any> {
    return this.httpClient.get<Inscription>(this.baseUrl + '/inscriptions' + '/' + id.toString());
  }



  public deleteInscription(id: number): Observable<any> {
    return this.httpClient.delete<Inscription>(this.baseUrl + '/inscriptions' + '/' + id.toString());
  }



}
