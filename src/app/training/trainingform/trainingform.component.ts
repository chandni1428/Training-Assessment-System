import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Training } from '../training';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddparticipantComponent } from '../addparticipant/addparticipant.component';
import { AddQueComponent } from '../add-que/add-que.component';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';

@Component
  ({
    selector: 'app-trainingform',
    templateUrl: './trainingform.component.html',
    styleUrls: ['./trainingform.component.css']
  })
export class TrainingFormComponent implements OnInit {
  trainingDetailsAdded: Boolean = false;
  @ViewChild(AddparticipantComponent) addParticipantCmpt;
  @ViewChild(AddQueComponent) addQuestionCmpt;
  trainingList: any = [];
  editMode: Boolean = false;
  training: any = {
    id: null,
    trainingName: "",
    trainerName: "",
    status: true,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isSubmitted: false,
  };
  modalRef: BsModalRef;

  constructor(private router: Router,
    private route: ActivatedRoute, private _confirmation: ConfirmationService,
    private modalService: BsModalService, public trainingService: TrainingService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.training.id = param["id"] || null;
      this.editMode = (param["id"]) ? true : false;
      if (this.editMode)
        this.formDataPrefill();
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  //Add Training on SAVE button
  onTrainingDetailsAdd() {
    this.trainingList.push(this.training);
    this.trainingDetailsAdded = true;
    this.modalRef.hide();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.trainingService.selectedtraining = {
      id: null,
      trainingName: '',
      trainerName: '',
      status: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    }
  }

  //Edit Training
  Edit(template, training: Training) {
    this.trainingService.selectedtraining = Object.assign({}, training);
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  //Contain Whole Training Data of Particular Training ID
  formDataPrefill() {
    this.trainingService.getTrainingData(this.training.id)
      .subscribe((res) => {
        this.training = res;
        this.trainingList[0] = res;
        this.addParticipantCmpt.participantList = this.training.participants;
        this.addQuestionCmpt.questionList = this.training.questions;
      })
  }

  //SUBMIT Whole Training
  onSubmit() {
    this._confirmation.create('Submit', 'Are you sure you want to submit?')
      // The confirmation returns an Observable Subject which will notify you about the outcome
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.training.participants = this.addParticipantCmpt.participantList;
          this.training.questions = this.addQuestionCmpt.questionList;
          this.training.isSubmitted = true;
          if (this.training.id == null) {
            this.trainingService.addTrainingData(this.training)
              .subscribe(data => {
                this.router.navigate(['/training'])
              })
          }
          else {
            this.trainingService.putTrainingData(this.training.id, this.training)
              .subscribe(data => {
                this.router.navigate(['/training'])
              });
          }
        }
      })
  }

  //Save as Draft Whole Training
  onSave() {
    this.training.participants = this.addParticipantCmpt.participantList;
    this.training.questions = this.addQuestionCmpt.questionList;
    this.training.isSubmitted = false;
    if (this.training.id == null) {
      this.trainingService.addTrainingData(this.training)
        .subscribe(data => {
          this.router.navigate(['/training']);
        })
    }
    else {
      this.trainingService.putTrainingData(this.training.id, this.training)
        .subscribe(data => {
          this.router.navigate(['/training']);
        });
    }
  }

  //On Click of Cancel Whole Training
  onCancel() {
    this._confirmation.create('Cancel', 'Are you sure you want to cancel?')
      // The confirmation returns an Observable Subject which will notify you about the outcome
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved)
          this.router.navigate(['/training']);
      })
  }

  // resetTrainingDetails(){
  //   this.training = {
  //     trainingName: "",
  //     trainerName: "",
  //     startDate: "",
  //     endDate: "",
  //     startTime: "",
  //     endTime: "",
  //   };
  // }

  onTrainigCancel() {
    this.modalRef.hide();
  }

}