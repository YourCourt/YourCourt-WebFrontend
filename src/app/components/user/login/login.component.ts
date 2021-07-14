import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  roles: string[] = [];
  formLogin: FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.formLogin = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }


  onLogin() {
    this.loginUser = new LoginUser(this.formLogin.value.username, this.formLogin.value.password);

    this.authService.login(this.loginUser).subscribe(
      responseLogin => {
        var res = responseLogin

        this.isLogged = true;
        this.isLoginFail = false;


        this.tokenService.setToken(res.token);
        this.tokenService.setUsername(res.username);
        this.tokenService.setAuthorities(res.authorities);
        appUtils.showSuccess(this.toastService,'Acceso exitoso')
        appUtils.redirect(this.router, '/')

      }, errorLogin => {
        this.isLogged = false;
        this.isLoginFail = true;

        var returned_error = errorLogin.error.error
        if (returned_error == 'Unauthorized') {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto');
        } else {
          appUtils.showDanger(this.toastService, 'Error desconocido');
        }

      }
    )
  }

  onLogout(): void {
    this.tokenService.logOut();
    appUtils.reload()
  }


}

