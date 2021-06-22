import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as courtUtils from 'src/app/components/court/courtUtils';
import * as appUtils from 'src/app/appUtils';
import { DatePipe } from '@angular/common';
import {
  NgbCalendar,
  NgbDatepickerConfig,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-court-show',
  templateUrl: './court-show.component.html',
  styleUrls: ['./court-show.component.css'],
})
export class CourtShowComponent implements OnInit {
  constructor(
    private courtService: CourtService,
    private bookingService: BookingService,
    private tokenService: TokenService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private calendar: NgbCalendar,
    private calendarConfig: NgbDatepickerConfig,
    private modalService: NgbModal
  ) {}

  court: Court;
  hours: Array<courtUtils.BookingHour> = courtUtils.hours;
  bookingsByDate: Array<courtUtils.BookingHour> = [];

  userId: number;

  model: NgbDateStruct;
  date: { year: number; month: number };
  today: Date;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  availability: any = {};

  ngOnInit(): void {
    this.getCourt();
    const today = new Date(); //Date('2021-06-06')
    this.model = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 3,
      day: today.getDate(),
    };
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.userId = data.id;
      },
      (err) => {}
    );
  }

  getCourt(): void {
    this.courtService
      .getCourt(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.court = data;
        },
        (err) => {
          appUtils.redirect(this.router, '/pistas');
        }
      );
  }

  getCourtType(type: string) {
    return courtUtils.getCourtType(type);
  }

  deleteCourt() {
    this.courtService.deleteCourt(this.court.id).subscribe(
      (data) => {
        return appUtils.promiseReload(this.router, '/pistas/', 2000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  openScrollableContent(longContent) {
    this.bookingsByDate = [];
    let formatDay = appUtils.addZeroBeforeNumber(this.model.day);
    let formatMonth = appUtils.addZeroBeforeNumber(this.model.month);
    let dateString: string =
      this.model.year.toString() + '-' + formatMonth + '-' + formatDay;
    this.bookingService.getBookingsByDate(dateString, this.court.id).subscribe(
      (data) => {
        for (var hourTuple of data) {
          this.bookingsByDate.push({ start: hourTuple[0], end: hourTuple[1] });
        }
        let today: boolean =
          this.model.year == this.calendar.getToday().year &&
          this.model.month == this.calendar.getToday().month &&
          this.model.day == this.calendar.getToday().day;
        this.availability = courtUtils.getAvailability(
          this.bookingsByDate,
          today
        );
      },
      (err) => {
        console.log(err);
      }
    );

    this.modalService.open(longContent, { scrollable: true, size: 'sm' });
  }

  book(start_hour: string, end_hour: string) {
    this.modalService.dismissAll();
    let formatDay = appUtils.addZeroBeforeNumber(this.model.day);
    let formatMonth = appUtils.addZeroBeforeNumber(this.model.month);
    let params = {
      start_hour: start_hour,
      end_hour: end_hour,
      day: formatDay,
      month: formatMonth,
      year: this.model.year,
      courtId: this.court.id,
      userId: this.userId,
    };
    return appUtils.redirectParams(this.router, '/reservas/crear', params);
  }
}
