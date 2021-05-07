import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as utils from 'src/app/components/court/courtUtils'
import { Court } from 'src/app/models/court';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-court-update',
  templateUrl: './court-update.component.html',
  styleUrls: ['./court-update.component.css']
})
export class CourtUpdateComponent implements OnInit {

  constructor(private courtService: CourtService, private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router,private formBuilder: FormBuilder) { }


  court: Court;
  courtUpdated:Court;
  defaultCourtType='FAST'
  form:FormGroup

  ngOnInit(): void {
    this.getCourt()

    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      courtType: [this.defaultCourtType, [Validators.required]],
    })
  }

  getCourt(): void {
    this.courtService.getCourt(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.court = data;

        this.form.controls['name'].setValue(data.name);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['courtType'].setValue(data.courtType);
      },
      err => {
        utils.redirect(this.router,'/pistas')      }
    );
  }

  updateCourt(): void {
    this.courtUpdated= new Court(this.form.value.name,this.form.value.description,this.form.value.courtType)

    this.courtService.updateCourt(this.court.id,this.courtUpdated).subscribe(
      data => {
        return utils.promiseReload(this.router,'/pistas/'+ data.id,3500)
      },
      err => {
        console.log(err)
      }
    );
  }

}
