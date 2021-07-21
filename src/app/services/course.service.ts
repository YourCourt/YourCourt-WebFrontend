import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAllCourses(): Observable<any> {
    return this.httpClient.get<Course[]>(this.baseUrl + '/courses');
  }

  public createCourse(course: Course): Observable<any> {
    return this.httpClient.post<Course>(this.baseUrl + '/courses', course);
  }

  public getCourse(id: number): Observable<any> {
    return this.httpClient.get<Course>(this.baseUrl + '/courses' + '/' + id.toString());
  }

  public updateCourse(course: Course, id: number): Observable<any> {
    return this.httpClient.put<Course>(this.baseUrl + '/courses' + '/' + id.toString(), course);
  }

  public deleteCourse(id: number): Observable<any> {
    return this.httpClient.delete<Course>(this.baseUrl + '/courses' + '/' + id.toString());
  }
}
