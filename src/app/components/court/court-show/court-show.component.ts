import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as utils from 'src/app/components/court/courtUtils'

@Component({
  selector: 'app-court-show',
  templateUrl: './court-show.component.html',
  styleUrls: ['./court-show.component.css']
})
export class CourtShowComponent implements OnInit {

  constructor(private courtService: CourtService, private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router) { }

  court: Court;

  ngOnInit(): void {
    this.getCourt()
  }

  getCourt(): void {
    this.courtService.getCourt(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.court = data;
      },
      err => {
        utils.redirect(this.router,'/pistas')      }
    );
  }

  getCourtType(type: string) {
    return utils.getCourtType(type)
  }

  deleteCourt() {
    this.courtService.deleteCourt(this.court.id).subscribe(
      data => {
        return utils.promiseReload(this.router,'/pistas/',2000)
      },
      err => {
        console.log(err)
      }
    );
  }

}
