import { Injectable } from '@angular/core';
import { Training } from './training';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrainingService {

  public trainingList: Training[];
  public selectedtraining: Training;

  private trainingUrl = 'http://localhost:3000/training';  // URL to web api

  constructor(public http: Http, private spinner: NgxSpinnerService) { }

  //GET: get Training List
  getTrainingList() {
    this.spinner.show();
    return this.http.get('http://localhost:3000/training')
      .map((res) => {
        this.spinner.hide();
        return res.json();
      })
  }

  //POST: ADD training
  addTrainingData(training) {
    this.spinner.show();
    return this.http.post('http://localhost:3000/training', training)
      .map((res) => {
        this.spinner.hide();
      })
  }

  //PUT: Update training 
  putTrainingData(id, training) {
    this.spinner.show();
    var body = JSON.stringify(training);
    return this.http.put(this.trainingUrl + "/" + training.id, training)
      .map(res => { this.spinner.hide(); });

  }

  //GET: get Training by ID
  getTrainingData(id) {
    return this.http.get('http://localhost:3000/training/' + id)
      .map((res) => {
        return res.json();
      })
  }

}
