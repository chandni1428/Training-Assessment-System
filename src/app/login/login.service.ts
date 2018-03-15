import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoginService {
    oldPasswsord: String = "";
    loginChanged = new Subject<any[]>();

    constructor(private http: Http, private spinner: NgxSpinnerService) { }

    setOldPassword(oldPassword) {
        this.oldPasswsord = oldPassword
    }

    getOldPassword() {
        return this.oldPasswsord;
    }

    //GET: get data for LOGIN
    login(loginData) {
        this.spinner.show();
        return this.http.get("http://localhost:3000/Login/", loginData)
            .map((result: Response) => {
                this.spinner.hide();
                return result.json();
            })
    }
}         