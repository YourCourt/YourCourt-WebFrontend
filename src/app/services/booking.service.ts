import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking, BookingDto } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = environment.backendEndpoint
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any>{
    return this.httpClient.get<Booking[]>(this.baseUrl+'/bookings');
  }

  public getBooking(id:number): Observable<any>{
    return this.httpClient.get<Booking>(this.baseUrl+'/bookings/'+id.toString());
  }

  public createBooking(bookingDto:BookingDto): Observable<any>{
    return this.httpClient.post<BookingDto>(this.baseUrl+'/bookings',bookingDto);
  }

  public deleteBooking(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl+'/bookings/'+id.toString());
  }
}
