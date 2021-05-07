import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import * as utils from 'src/app/components/court/courtUtils'

@Component({
  selector: 'app-court-create',
  templateUrl: './court-create.component.html',
  styleUrls: ['./court-create.component.css']
})
export class CourtCreateComponent implements OnInit {

  form: FormGroup;
  courtCreated:Court;
  defaultCourtType='FAST'

  constructor(private courtService: CourtService,private formBuilder: FormBuilder,private router: Router) {

    this.form = formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      courtType: [this.defaultCourtType, [Validators.required]],
    })
   }

  ngOnInit(): void {

  }

  createCourt(): void {
    this.courtCreated= new Court(this.form.value.name,this.form.value.description,this.form.value.courtType)

    this.courtService.createCourt(this.courtCreated).subscribe(
      data => {
        return utils.promiseReload(this.router,'/pistas/'+ data.id,3500)
      },
      err => {
        console.log(err)
      }
    );
  }

}
