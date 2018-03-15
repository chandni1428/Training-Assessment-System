import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  options = {};
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.loginChanged.subscribe(() => {
      this.isLoggedIn = (localStorage.getItem("user")) ? true : false;
    });
    this.isLoggedIn = (localStorage.getItem("user")) ? true : false;
  }
}
