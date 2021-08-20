import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as appUtils from 'src/app/appUtils'
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { FacilityService } from 'src/app/services/facility.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Facility } from 'src/app/models/facility';
@Component({
  selector: 'app-facility-create',
  templateUrl: './facility-create.component.html',
  styleUrls: ['./facility-create.component.css']
})
export class FacilityCreateComponent implements OnInit {

  form: FormGroup;
  image: File

  facilityTypes: string[] = [];
  facilityTypeSelected: string;

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

  constructor(private facilityService: FacilityService, private imageService: ImageService, private toastService: ToastService,private formBuilder: FormBuilder, private router: Router) {

    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      facilityType: [this.facilityTypeSelected, [Validators.required]],
    })
  }

  ngOnInit(): void {    
    this.getFacilityTypes();
  }

  getFacilityTypes(): void {
    this.facilityService.getAllFacilityTypes().subscribe(
      data => { this.facilityTypes = data.map(facilityType => facilityType.typeName) }, err => { appUtils.showDanger(this.toastService, err); });
  }

  createFacility(): void {
    let facilityCreated = new Facility(this.form.value.name, this.form.value.description, this.form.value.facilityType)

    this.facilityService.createFacility(facilityCreated).subscribe(
      data => {
        if(this.image!=undefined){

          this.imageService.newFacilityImage(data.id,this.image).subscribe(
            newFacilityImage => {},errorImage => {appUtils.showErrorMessages(errorImage, this.toastService)});
        }
        this.loading=true;
        appUtils.showSuccess(this.toastService,'Instalación creada')
        return appUtils.promiseReload(this.router, '/instalaciones/' + data.id, 5500)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
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
