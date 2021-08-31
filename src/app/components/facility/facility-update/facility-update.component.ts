import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { FacilityService } from 'src/app/services/facility.service';
import { Facility } from 'src/app/models/facility';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
@Component({
  selector: 'app-facility-update',
  templateUrl: './facility-update.component.html',
  styleUrls: ['./facility-update.component.css']
})
export class FacilityUpdateComponent implements OnInit {

  constructor(private facilityService: FacilityService, private imageService: ImageService, private tokenService: TokenService, private toastService: ToastService, private activatedRoute: ActivatedRoute, private router: Router,private formBuilder: FormBuilder) { }


  facility: Facility;
  facilityTypes: string[] = [];
  facilityTypeSelected: string;
  facilityUpdated:Facility;

  form:FormGroup
  image: File

  loading:boolean=false;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.facilityTypes
        : this.facilityTypes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit(): void {
    this.getFacility();
    this.getFacilityTypes();

    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      facilityType: [this.facilityTypeSelected, [Validators.required]],
    })
  }

  getFacility(): void {
    this.facilityService.getFacility(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.facility = data;

        this.form.controls['name'].setValue(data.name);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['facilityType'].setValue(data.facilityType.typeName);
        this.facilityTypeSelected=data.facilityType.typeName;
      },
      err => {
        appUtils.showErrorMessages(err,this.toastService)
        appUtils.redirect(this.router,'/instalaciones')      }
    );
  }

  getFacilityTypes(): void {
    this.facilityService.getAllFacilityTypes().subscribe(
      data => { this.facilityTypes = data.map(facilityType => facilityType.typeName) }, err => { appUtils.showDanger(this.toastService, err); });
  }

  updateFacility(): void {
    this.facilityUpdated= new Facility(this.form.value.name,this.form.value.description,this.form.value.facilityType)

    this.facilityService.updateFacility(this.facility.id,this.facilityUpdated).subscribe(
      data => {
        if(this.image!=undefined){

          this.imageService.newFacilityImage(data.id,this.image).subscribe(
            newFacilityImage => {},errorImage => {appUtils.showErrorMessages(errorImage, this.toastService)});
        }
        this.loading=true;
        appUtils.showSuccess(this.toastService,'Instalación actualizada')
        return appUtils.promiseReload(this.router,'/instalaciones/'+ data.id,3500)
      },
      err => {
        appUtils.showDanger(this.toastService,err)
      }
    );
  }

  addFacilityImage(imageFile: FileList, image) {
    const file = imageFile.item(0)
    if (file.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png') {
      this.image = file
    } else {
      image.value = undefined
    }
  }

}
