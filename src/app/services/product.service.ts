import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductType } from '../models/product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.backendEndpoint;
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<any> {
    return this.httpClient.get<Product[]>(this.baseUrl + '/products');
  }

  public getAllProductTypes(): Observable<any> {
    return this.httpClient.get<ProductType[]>(
      this.baseUrl + '/products/productTypes'
    );
  }

  public getProductByTypeName(typeName: string): Observable<any> {
    let params = new HttpParams().set('typeName', typeName);
    return this.httpClient.get<Product[]>(
      this.baseUrl + '/products/productsByType',
      { params }
    );
  }

  public getProductById(id: number): Observable<any> {
    return this.httpClient.get<Product[]>(
      this.baseUrl + '/products/' + id.toString()
    );
  }
}
