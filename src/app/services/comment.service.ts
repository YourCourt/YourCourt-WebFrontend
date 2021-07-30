import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public createComment(comment: Comment): Observable<any> {
    return this.httpClient.post<Comment>(this.baseUrl + '/comments', comment);
  }

  public deleteComment(commentId: number): Observable<any> {
    return this.httpClient.delete<Comment>(this.baseUrl + '/comments/' + commentId.toString());
  }

}
