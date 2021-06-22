import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as courtUtils from 'src/app/components/court/courtUtils'
import * as appUtils from 'src/app/appUtils'
import { Court } from 'src/app/models/court';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-court-update',
  templateUrl: './court-update.component.html',
  styleUrls: ['./court-update.component.css']
})
export class CourtUpdateComponent implements OnInit {

  constructor(private courtService: CourtService, private imageService: ImageService, private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router,private formBuilder: FormBuilder) { }


  court: Court;
  courtUpdated:Court;
  defaultCourtType='FAST'
  form:FormGroup
  image: File

  loading:boolean=false;

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
        appUtils.redirect(this.router,'/pistas')      }
    );
  }

  updateCourt(): void {
    this.courtUpdated= new Court(this.form.value.name,this.form.value.description,this.form.value.courtType)

    this.courtService.updateCourt(this.court.id,this.courtUpdated).subscribe(
      data => {
        if(this.image!=undefined){

          this.imageService.newCourtImage(data.id,this.image).subscribe(
            data => {},err => {});
        }
        this.loading=true;
        return appUtils.promiseReload(this.router,'/pistas/'+ data.id,3500)
      },
      err => {
        console.log(err)
      }
    );
  }

  addCourtImage(imageFile: FileList, image) {
    const file = imageFile.item(0)
    if (file.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png') {
      this.image = file
    } else {
      image.value = undefined
    }
  }

}
