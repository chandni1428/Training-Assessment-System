import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeService } from './change.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  temp: any = {
    id: '',
    name: '',
  }
  userData: any = {
    oldPassword: '',
    newPassword: '',
    conformPassword: ''
  };
  constructor(private router: Router,
    private changeService: ChangeService,
    private loginService: LoginService) { }

  //Click on Cancel Button
  Oncancel() {
    this.router.navigate(['/dashboard']);
  }

  //Click on Submit Button
  OnSubmit() {
    if (this.userData.newPassword != this.userData.conformPassword || this.loginService.getOldPassword() != this.userData.oldPassword) {
      alert("error");
    }
    else {
      let temp = {
        id: this.userData.id,
        name: this.userData.name,
        password: this.userData.newPassword,
        isPasswordSet: true
      }
      this.changeService.Changepassword(temp)
        .subscribe((res) => {
          console.log(res);
        });
      alert("change-successfully");
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.changeService.getData().subscribe((response) => {
      this.userData = response;
    });
  }
}
