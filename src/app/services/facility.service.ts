import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Facility, FacilityType } from '../models/facility';
@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any> {
    return this.httpClient.get<Facility[]>(this.baseUrl + '/facilities');
  }

  public getAllFacilityTypes(): Observable<any> {
    return this.httpClient.get<FacilityType[]>(
      this.baseUrl + '/facilities/facilityTypes'
    );
  }

  public getFacility(id: number): Observable<any> {
    return this.httpClient.get<Facility>(this.baseUrl + '/facilities/' + id.toString());
  }

  public createFacility(facility: Facility): Observable<any> {
    return this.httpClient.post<Facility>(this.baseUrl + '/facilities', facility);
  }

  public updateFacility(id: number, facility: Facility): Observable<any> {
    return this.httpClient.put<Facility>(this.baseUrl + '/facilities/' + id.toString(), facility);
  }

  public deleteFacility(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/facilities/' + id.toString());
  }
}
