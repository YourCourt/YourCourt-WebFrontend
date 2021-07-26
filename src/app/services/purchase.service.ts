import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase, PurchaseDto } from '../models/purchase';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any>{
    return this.httpClient.get<Purchase[]>(this.baseUrl+'/purchases');
  }

  public getPurchase(id:number): Observable<any>{
    return this.httpClient.get<Purchase>(this.baseUrl+'/purchases/'+id.toString());
  }

  public createPurchase(purchaseDto:PurchaseDto): Observable<any>{
    return this.httpClient.post<PurchaseDto>(this.baseUrl+'/purchases',purchaseDto);
  }

  public deletePurchase(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl+'/purchases/'+id.toString());
  }
}
