import { Injectable } from '@angular/core';
import { MyNewInterface } from './my-new-interface';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ParticipantService {

  public usersList: MyNewInterface[];
  public selectedUser: MyNewInterface;

  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  constructor(public http: Http) { }

  // GET users from the server
  getUserList() {
    return this.http.get('http://localhost:3000/users')
    .map((res)=>{
      return res.json() as MyNewInterface[];
    }).toPromise().then(x => {
      this.usersList = x;             
  })
}  
}



