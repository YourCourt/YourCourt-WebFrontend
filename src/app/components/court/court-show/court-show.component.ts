import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as courtUtils from 'src/app/components/court/courtUtils'
import * as appUtils from 'src/app/appUtils'
import { DatePipe } from '@angular/common';
import { NgbCalendar, NgbDatepickerConfig, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-court-show',
  templateUrl: './court-show.component.html',
  styleUrls: ['./court-show.component.css']
})
export class CourtShowComponent implements OnInit {

  constructor(private courtService: CourtService, private tokenService: TokenService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, public datepipe: DatePipe, private calendar: NgbCalendar, private calendarConfig: NgbDatepickerConfig, private modalService: NgbModal) {

  }

  court: Court;
  hours: Array<string> = courtUtils.hours

  userId:number;

  model: NgbDateStruct;
  date: { year: number, month: number };
  today: Date
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  availability;

  ngOnInit(): void {
    this.getCourt()
    const today = new Date();//Date('2021-06-06')
    this.model = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 3, day: today.getDate() };
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      data => {
        this.userId = data.id;
      },
      err => {
        
      }
    );
    
  }

  getCourt(): void {
    this.courtService.getCourt(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.court = data;
      },
      err => {
        appUtils.redirect(this.router, '/pistas')
      }
    );
  }

  getCourtType(type: string) {
    return courtUtils.getCourtType(type)
  }

  deleteCourt() {
    this.courtService.deleteCourt(this.court.id).subscribe(
      data => {
        return appUtils.promiseReload(this.router, '/pistas/', 2000)
      },
      err => {
        console.log(err)
      }
    );
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  openScrollableContent(longContent) {
    this.availability = { '09:00': true, '10:00': true, '11:00': true, '12:00': false, '13:00': true, '14:00': true, '17:00': false, '18:00': true, '19:00': false, '20:00': true, '21:00': true }
    this.modalService.open(longContent, { scrollable: true, size: 'sm' });
  }

  book(hour: string) {
    this.modalService.dismissAll()
    let formatDay=appUtils.addZeroBeforeNumber(this.model.day)
    let formatMonth=appUtils.addZeroBeforeNumber(this.model.month)
    let params={ 'hour': hour, 'day': formatDay, 'month': formatMonth, 'year': this.model.year,'courtId':this.court.id, 'userId':this.userId}
    return appUtils.redirectParams(this.router, '/reservas/crear',params)
  }
}
