import { DatePipe } from '@angular/common';
import { tokenReference } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  isLogged = false;
  newUser: NewUser;
  suscription: Observable<any>;

  messageError: string;
  httpError:Array<string>=[];
  isRegisterFail = false;
  formRegister: FormGroup;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private formBuilder: FormBuilder) {

                this.formRegister = formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                  email: ['', Validators.email],
                  birthDate: ['', Validators.required],
                  phone: ['', Validators.pattern("^[+]*\\([0-9]{1,4}\\)[-\\s\\./0-9]*$")],
                  membershipNumber: ['', [Validators.required]]
                })
               }

  ngOnInit(): void {
    
      if(this.tokenService.getToken()){
        this.isLogged= true;
      }
  }

  onRegister(): void{
    this.httpError=[];
    
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
            console.log(responseLogin)
    
            this.isLogged = true;
            this.isRegisterFail = false;
    
            this.tokenService.setToken(responseLogin.token);
            this.tokenService.setUsername(responseLogin.username);
            this.tokenService.setAuthorities(responseLogin.authorities);
    
            this.router.navigate(['/']);
            
          }, errorLogin =>{
            console.log(errorLogin)
          }
        )

      }, errorRegister =>{

        console.log(errorRegister)
        this.isLogged = false;
        this.isRegisterFail = true;
        if(errorRegister.error && errorRegister.status!=0){
          for (var text in errorRegister.error) {
            this.httpError.push(errorRegister.error[text])
        }
      }else{
        this.httpError.push("Error desconocido")
      }
        /*
        this.isLogged = false;
        this.isRegisterFail = true;

        var returned_error = errorRegister.error.text
        if(returned_error == undefined){
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;*/

        
    
  }
  );
  
}
}