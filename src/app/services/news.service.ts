import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAllNews(): Observable<any> {
    return this.httpClient.get<News[]>(this.baseUrl + '/news');
  }

  public createNews(news: News): Observable<any> {
    return this.httpClient.post<News>(this.baseUrl + '/news', news);
  }

  public getNews(id: number): Observable<any> {
    return this.httpClient.get<News>(this.baseUrl + '/news' + '/' + id.toString());
  }

  public updateNews(news: News, id: number): Observable<any> {
    return this.httpClient.put<News>(this.baseUrl + '/news' + '/' + id.toString(), news);
  }

  public deleteNews(id: number): Observable<any> {
    return this.httpClient.delete<News>(this.baseUrl + '/news' + '/' + id.toString());
  }
}
