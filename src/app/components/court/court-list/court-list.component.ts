import { Component, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import * as utils from 'src/app/components/court/courtUtils'
import * as appUtils from 'src/app/appUtils';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-court-list',
  templateUrl: './court-list.component.html',
  styleUrls: ['./court-list.component.css']
})
export class CourtListComponent implements OnInit {

  courts: Court[] = []
  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)
  constructor(private courtService: CourtService,private tokenService: TokenService) { }

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  ngOnInit(): void {
    this.getCourts()
  }

  getCourts(): void {

    this.courtService.getAll().subscribe(
      data => {
        this.courts = data;
      },
      err => {
        console.log(err)
      }
    );
  }
  
  getCourtType(type:string){
    return utils.getCourtType(type)
  }
}