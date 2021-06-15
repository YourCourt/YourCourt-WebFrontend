import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as bookingUtils from 'src/app/components/booking/bookingUtils'
import * as appUtils from 'src/app/appUtils'
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingDto } from 'src/app/models/booking';
@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {

  hour: string;
  day: number;
  month: string;
  year: number;
  courtId: number;
  userId: number;
  startDate: string;
  endDate: string;
  form:FormGroup;

  constructor(private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router, private bookingService: BookingService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({

    })
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => { this.hour = params['hour'], this.day = params['day'], this.month = params['month'], this.year = params['year'], this.courtId = params['courtId'], this.userId = params['userId'] });
    this.startDate = this.year.toString() + '-' + this.month + '-' + this.day.toString() + 'T' + this.hour
    this.endDate = this.year.toString() + '-' + this.month + '-' + this.day.toString() + 'T' + bookingUtils.addOneHour(this.hour)

  }

  createBooking(){
    let bookingCreated=new BookingDto(this.courtId,2,this.startDate,this.endDate,[]);

    this.bookingService.createBooking(bookingCreated).subscribe(
      data => {
        return appUtils.promiseReload(this.router, '/reservas/' + data.id, 2000)
      },
      err => {
        console.log(err)
      }
    );
  }

}
