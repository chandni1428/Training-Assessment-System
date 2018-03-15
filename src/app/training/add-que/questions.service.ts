import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QuestionsService {

  public questionsList = [];
  public question: any = {};

  private questionUrl = "http://localhost:3000/training";

  constructor(private http: HttpClient) { }

  //GET questions from the server
  getQuestionsList() {
    return this.http.get('http://localhost:3000/training')
      .map((res) => {
        return res
      })
  }

  //POST: Add a new question to the server
  addQuestionData(question) {
    let que = {
      questions: question
    };
    return this.http.post('http://localhost:3000/training', question)
      .map((res: Response) => {
        return null;
      })
  }

  //PUT: Update an user data into list
  putQuestionData(id, question) {
    var body = JSON.stringify(question);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.questionUrl + "/" + question.id, question)
      .map((res: Response) => {
        return null;
      });
  }

  deleteQuestionData(id) {
    return this.http.delete(this.questionUrl + "/" + id)
      .map((res: Response) => res.json());
  }

}
