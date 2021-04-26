import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'yourcourt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  isLogged:boolean = false;
  loggedUsername: String;

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.loggedUsername=this.tokenService.getUsername();
    }
  }
    logOut(): void {
      this.tokenService.logOut();
      this.router.navigate(["/"]).then( () => {window.location.reload()} )
    }
    


}
