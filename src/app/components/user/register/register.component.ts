import * as appUtils from 'src/app/appUtils';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  isLogged = false;
  newUser: NewUser;

  isRegisterFail = false;
  formRegister: FormGroup;

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder) {

    this.formRegister = formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])?[A-Za-z\d$@$!%*?&].{8,}")]],
      email: ['', [Validators.email,Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      birthDate: ['', Validators.required],
      phone: ['', Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")],
      membershipNumber: ['', [Validators.required, Validators.pattern("\\b\\d{5}\\b")]]
    })
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {

    this.newUser = new NewUser(this.formRegister.value.username,
      this.formRegister.value.password,
      this.formRegister.value.email,
      this.formRegister.value.birthDate,
      this.formRegister.value.phone,
      this.formRegister.value.membershipNumber);

    //console.log(this.newUser)
    this.authService.new(this.newUser).subscribe(
      responseRegister => {

        //console.log("User " + res.username + "  sucessfully created.")

        this.authService.login(new LoginUser(this.formRegister.value.username,
          this.formRegister.value.password)).subscribe(
            responseLogin => {

              this.isLogged = true;
              this.isRegisterFail = false;

              this.tokenService.setToken(responseLogin.token);
              this.tokenService.setUsername(responseLogin.username);
              this.tokenService.setAuthorities(responseLogin.authorities);
              appUtils.showSuccess(this.toastService,'Registro exitoso')
              appUtils.promiseReload(this.router, '/' , 1000)

            }, errorLogin => {
              appUtils.showDanger(this.toastService, errorLogin);
            }
          )

      }, errorRegister => {

        this.isLogged = false;
        this.isRegisterFail = true;
        appUtils.showErrorMessaages(errorRegister,this.toastService)
        // if (errorRegister.error && errorRegister.status != 0) {
        //   for (var text in errorRegister.error) {
        //     appUtils.showDanger(this.toastService, errorRegister.error[text]);
        //   }
        // } else {
        //   appUtils.showDanger(this.toastService, 'Error desconocido');
        // }

      }
    );

  }
}