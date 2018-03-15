import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MyNewInterface } from './my-new-interface';
import { ParticipantService } from './participants.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
@Component({
  selector: 'app-addparticipant',
  templateUrl: './addparticipant.component.html',
  styleUrls: ['./addparticipant.component.css'],
})
export class AddparticipantComponent {
  participantList = [];
  selectedAll: any;
  modalRef: BsModalRef;
  temp = [];
  constructor(private modalService: BsModalService, public usersService: ParticipantService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  ngOnInit() {
    this.usersService.getUserList();
  }

  selectAll() {
    for (var i = 0; i < this.usersService.usersList.length; i++) {
      this.usersService.usersList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.usersService.usersList.every(function (item: any) {
      return item.selected == true;
    })
  }

  clear() {
    for (var i = 0; i < this.usersService.usersList.length; i++) {
      this.usersService.usersList[i].selected = false;
    }
  }

  //Add Participant in the training
  save() {
    let temp = [];
    this.usersService.usersList.forEach(element => {
      if (element.selected) {
        temp.push(element);
      }
    });
    this.participantList = temp;
    this.modalRef.hide()
  }

  //Delete Participant from training
  removeUser(index) {
    this.participantList.splice(index, 1)
  }
}
