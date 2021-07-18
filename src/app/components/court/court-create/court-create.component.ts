import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtService } from 'src/app/services/court.service';
import * as appUtils from 'src/app/appUtils'
import * as courtUtils from 'src/app/components/court/courtUtils'
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-court-create',
  templateUrl: './court-create.component.html',
  styleUrls: ['./court-create.component.css']
})
export class CourtCreateComponent implements OnInit {

  form: FormGroup;
  defaultCourtType = 'FAST'
  image: File
  courtTypes:Map<string,string>=courtUtils.courtTypes
  courtTypesEntries=Array.from(this.courtTypes.entries());
  loading:boolean=false;

  constructor(private courtService: CourtService, private imageService: ImageService, private toastService: ToastService,private formBuilder: FormBuilder, private router: Router) {

    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      courtType: [this.defaultCourtType, [Validators.required]],
    })
  }

  ngOnInit(): void {    
  }

  createCourt(): void {
    let courtCreated = new Court(this.form.value.name, this.form.value.description, this.form.value.courtType)

    this.courtService.createCourt(courtCreated).subscribe(
      data => {
        if(this.image!=undefined){

          this.imageService.newCourtImage(data.id,this.image).subscribe(
            data => {},errorImage => {appUtils.showErrorMessaages(errorImage, this.toastService)});
        }
        this.loading=true;
        appUtils.showSuccess(this.toastService,'Pista creada')
        return appUtils.promiseReload(this.router, '/pistas/' + data.id, 5500)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
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
