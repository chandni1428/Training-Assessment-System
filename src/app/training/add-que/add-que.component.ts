import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionsService } from './questions.service';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.css']
})
export class AddQueComponent implements OnInit {
  modalRef: BsModalRef;
  questionList: any = [];
  questionObj: any;
  selectedId: any;
  selectedIndex: number = undefined;
  constructor(public questionsService: QuestionsService,
    private modalService: BsModalService) { }

    initQuestionObject() {
      this.questionObj =
        {
          "id": undefined,
          "queTitle": "",
          "Options": [
            {
              "opt": ""
            },
            {
              "opt": ""
            },
            {
              "opt": ""
            },
            {
              "opt": ""
            }
          ]
        }
    }
  
  //Open Modal for Add and Delete
  openModal(index, row, template: TemplateRef<any>) {
    if (index == null) {
      this.initQuestionObject();
      this.selectedIndex = null;
    } else {
      this.selectedIndex = index;
      this.selectedId = row;
    }
    this.modalRef = this.modalService.show(template, {class :"modal-lg"});
  }

  ngOnInit() {
    this.initQuestionObject();
  }

  //on Click on EDIT Icon
  onEditClick(index, row, template) {
    this.selectedIndex = index;
    this.questionObj = row;
    this.modalRef = this.modalService.show(template, {class :"modal-lg"})
  }

  //on click SAVE button
  onAdd() {
    if (this.selectedIndex != undefined) {
      this.questionList[this.selectedIndex] = this.questionObj;
      this.initQuestionObject();
      this.modalRef.hide();
    } else {
      this.questionList.push(this.questionObj);
      this.initQuestionObject();
    }
    this.selectedIndex = undefined;
  }

  //Reset Form
  resetForm(form?: NgForm) {
    this.initQuestionObject();
  }


  // onDelete(question, template) {
  //   this.modalRef = this.modalService.show(template, {class :"modal-lg"});
  // }

  //Delete modal click - Delete Selected Question
  onConfirm(template) {
    this.questionList.splice(this.selectedIndex, 1)
    this.modalRef.hide();
  }

  //delete modal click - modal hide
  onCancel(template) {
    this.modalRef.hide();
  }
}
