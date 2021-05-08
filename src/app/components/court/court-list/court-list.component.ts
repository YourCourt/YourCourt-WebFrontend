import { Component, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import * as utils from 'src/app/components/court/courtUtils'

@Component({
  selector: 'app-court-list',
  templateUrl: './court-list.component.html',
  styleUrls: ['./court-list.component.css']
})
export class CourtListComponent implements OnInit {

  courts: Court[] = []
  constructor(private courtService: CourtService) { }

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