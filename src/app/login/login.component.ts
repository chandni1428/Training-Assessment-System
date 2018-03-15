import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id = '';
  password = '';
  flag = false;
  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  //On Click on LOGIN button
  Login() {
    this.loginService.login(this.id)
      .subscribe((res) => {
        let loginUser = {};
        res.forEach(user => {
          if (user.name == this.id && user.password == this.password) {
            this.flag = true;
            loginUser = user;
            localStorage.setItem("user", JSON.stringify(user));
            this.loginService.loginChanged.next();
          }
        });

        //if Flag true 
        if (this.flag == true) {
          this.loginService.setOldPassword(this.password);

          if ("isPasswordSet" in loginUser) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/change-password']);
          }
        }
        else {
          alert("error");
        }
      },
      error => { console.log("error") });
  }
}
