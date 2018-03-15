import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { GLOBAL } from '../app.global';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ChangeService {

    constructor(private http: Http,private spinner: NgxSpinnerService) { }

    //GET: get user data for Change Password
    getData() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.spinner.show();
        return this.http.get("http://localhost:3000/Login/" + user.id)
            .map((result: Response) => {
                this.spinner.hide();
                return result.json();
            })
    }

    //PUT: update new password for Current User
    Changepassword(changeData) {
        this.spinner.show();
        return this.http.put("http://localhost:3000/Login/" + changeData.id, changeData)
            .map((result: Response) => {
                this.spinner.hide();
                return result.json();
            })
    }
}

