import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/services/facility.service';
import * as appUtils from 'src/app/appUtils';
import { TokenService } from 'src/app/services/token.service';
import { Facility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {

  facilities: Facility[] = []
  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)
  constructor(private facilityService: FacilityService,private tokenService: TokenService) { }

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  ngOnInit(): void {
    this.getFacilitiess()
  }

  getFacilitiess(): void {

    this.facilityService.getAll().subscribe(
      data => {
        this.facilities = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
