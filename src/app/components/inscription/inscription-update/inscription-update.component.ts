import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils'
import { Court } from 'src/app/models/court';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { Inscription } from 'src/app/models/course';
import { InscriptionService } from 'src/app/services/inscription.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-inscription-update',
  templateUrl: './inscription-update.component.html',
  styleUrls: ['./inscription-update.component.css']
})
export class InscriptionUpdateComponent implements OnInit {


  constructor(private inscriptionService: InscriptionService, private authService: AuthService, private tokenService: TokenService, private toastService: ToastService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }


  inscription: Inscription;
  user: User;
  form: FormGroup

  loading: boolean = false;
  isInscriptionOwner: boolean;
  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)

  ngOnInit(): void {
    this.getInscription()
  }

  getInscription(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surnames: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ['', [Validators.required, Validators.maxLength(512)]],
      email: [''],
      phone: [''],
    })
    this.inscriptionService.getInscription(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.inscription = data;

        this.form.controls['name'].setValue(data.name);
        this.form.controls['surnames'].setValue(data.surnames);
        this.form.controls['observations'].setValue(data.observations);

        this.authService.showUser(this.tokenService.getUsername()).subscribe(
          (data) => {
            this.user = data;
            this.isInscriptionOwner = this.user.id === this.inscription.user;
            if (this.isInscriptionOwner==false && this.isAdmin==false) {
              appUtils.showDanger(this.toastService, 'Usuario incorrecto')
              return appUtils.promiseReload(this.router, '/', 500);
            }

            this.form.controls['email'].setValue(data.email);
            this.form.controls['phone'].setValue(data.phone);

          },
          (err) => { appUtils.showDanger(this.toastService, 'Usuario no logueado') }
        );


      },
      err => {
        appUtils.showDanger(this.toastService, 'Inscripción inexistente')
        appUtils.redirect(this.router, '/cursos')
      }
    );
  }

  updateInscription(): void {
    let inscriptionUpdated = new Inscription(this.form.value.name, this.form.value.surnames, this.form.value.email, this.form.value.phone, this.form.value.observations)
    this.inscriptionService.updateInscription(inscriptionUpdated, this.inscription.id).subscribe(
      data => {

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Inscripción creada')
        return appUtils.promiseReload(this.router, '/inscripciones/' + data.id, 2500)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }

}
