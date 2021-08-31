import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private tokenService: TokenService
    ) { }

    page=4;

  isLogged:boolean = false;
  loggedUsername: string;

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.loggedUsername=this.tokenService.getUsername();
    }
  }

}
