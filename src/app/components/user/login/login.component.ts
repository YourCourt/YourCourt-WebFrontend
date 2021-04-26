import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  roles : string[] = [];
  messageError: string;
  formLogin: FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.formLogin = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }


  onLogin(){
    this.loginUser = new LoginUser(this.formLogin.value.username, this.formLogin.value.password);
 //console.log(this.loginUser)
    this.authService.login(this.loginUser).subscribe(
      responseLogin => {
        var res = responseLogin

        this.isLogged = true;
        this.isLoginFail = false;


        this.tokenService.setToken(res.token);
        this.tokenService.setUsername(res.username);
        this.tokenService.setAuthorities(res.authorities);

        this.router.navigate(['/']);
        
      }, errorLogin =>{
        this.isLogged = false;
        this.isLoginFail = true;
        console.log(errorLogin)
        
        var returned_error = errorLogin.error.error
        if(returned_error == 'Unauthorized'){
          returned_error = 'Usuario incorrecto'
        }else{
          returned_error = 'Error desconocido'
        }
        this.messageError = returned_error;
     //console.log(this.messageError)
        
      }
    )
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }


}

