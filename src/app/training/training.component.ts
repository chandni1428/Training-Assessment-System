import { Component, ViewChild, OnInit } from '@angular/core';
import { ParticipantService } from './addparticipant/participants.service';
import { TrainingService } from './training.service';
import { Router } from '@angular/router';
import { AddparticipantComponent } from './addparticipant/addparticipant.component';
import { AddQueComponent } from './add-que/add-que.component';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import { AlertsService } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  @ViewChild(AddparticipantComponent) addParticipantCmpt;
  @ViewChild(AddQueComponent) addQuestionCmpt;
  trainingList: any = [];
  training = {};
  isSet: Boolean = false;

  constructor(public trainingService: TrainingService, private _alert: AlertsService, private router: Router, private _confirmation: ConfirmationService, ) { }

  ngOnInit() {
    this.trainingService.getTrainingList()
      .subscribe((res) => {
        this.trainingList = res;
      })
  }
  OnDisable() {



  }

  sendLink() {
    this._alert.create("success", 'Activation link has been sent');
  }

  onStatusChange(row) {
    if (row.status) {
      this._confirmation.create('Cancel', 'Are you sure you want to deactivate the training?')
        // The confirmation returns an Observable Subject which will notify you about the outcome
        .subscribe((ans: ResolveEmit) => {
          if (ans.resolved) {
            this.trainingService.putTrainingData(row.id, row)
              .subscribe(data => {
                this.trainingService.getTrainingList();
              });
          } else {
            row.status = !row.status;
          }
        })
    } else {
      row.status = !row.status;
      this.trainingService.putTrainingData(row.id, row)
        .subscribe(data => {
          this.trainingService.getTrainingList();
        });
    }
  }
  
  getTrainingEndDateFormat(endDate) {
    return Date.parse(endDate) > Date.parse(new Date().toString());
  }
}
