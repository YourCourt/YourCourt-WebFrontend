import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public newCourtImage(id: number, image: File): Observable<any> {
    var url = this.baseUrl + '/image/court/' + id
    const formData: FormData = new FormData()
    formData.append('multipartFile', image)
    return this.httpClient.post<any>(url, formData)
  }
}