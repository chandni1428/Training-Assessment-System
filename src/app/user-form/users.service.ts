import { Injectable } from '@angular/core';
import { Users } from './users';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UsersService {

  public usersList: Users[];
  public selectedUser: Users;

  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  constructor(public http: Http, private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  // GET users from the server
  getUserList() {
    this.spinner.show();
    return this.http.get('http://localhost:3000/users')
      .map((res) => {
        this.spinner.hide();
        return res.json() as Users[];
      }).toPromise().then(x => {
        this.usersList = x;
      })
  }

  //POST: Add a new user to the server
  addUserData(user: Users) {
    this.spinner.show();
    return this.http.post('http://localhost:3000/users', user)
      .map((res) => {
        this.spinner.hide();
        this.toastr.success( 'User details added!','Success');
        return res.json();
      })
  }

  //PUT: Update an user data into list
  putUserData(id, user: Users) {
    this.spinner.show();
    var body = JSON.stringify(user);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.usersUrl + "/" + user.id, user, requestOptions)
      .map(res => {this.toastr.success( 'User details updated!','Success'); this.spinner.hide()});

  }

  //DELETE: delete user data from the list
  deleteUserData(id: number, user: Users) {
    this.spinner.show();
    var body = JSON.stringify(user);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.usersUrl + "/" + user.id, user, requestOptions).map(res => {
      this.spinner.hide();
    });
  }
}