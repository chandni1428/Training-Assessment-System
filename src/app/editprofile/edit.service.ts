import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GLOBAL } from '../app.global';
import 'rxjs/Rx';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EditService {

    constructor(private http: Http, private spinner: NgxSpinnerService,
                private toastr: ToastrService) { }

    //GET: get data of loggedIn User
    getData() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.spinner.show();
        return this.http.get("http://localhost:3000/edit/" + user.id)
            .map((result: Response) => {
                this.spinner.hide();
                return result.json();
            })
    }

    //PUT: Update profile of LoggedIn User
    putData(dataPost) {
        this.spinner.show();
        return this.http.put("http://localhost:3000/edit/" + dataPost.id, dataPost)
            .map((result: Response) => {
                this.spinner.hide();
                this.toastr.success('Data Updated', 'Success');
                return result.json();
            })
    }
}