import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UsersService } from './users.service';
import { Users } from './users'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  modalRef: BsModalRef;
  selectedUser: any;

  constructor(private modalService: BsModalService,
    public usersService: UsersService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class :"modal-lg"});
  }
  
  ngOnInit() {
    this.usersService.getUserList();
    this.resetForm();
  }

  //Reset Form
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.usersService.selectedUser = {
      id: null,
      firstName: '',
      lastName: '',
      eMail: '',
      contactNo: null,
      role: '',
      isActive: true
    }
  }

  //Form Submit Method
  //if form don't have id then it will Add the User data
  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      form.value.isActive = true;
      this.usersService.addUserData(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.usersService.getUserList();
        })
    }
    //if onclick on 'edit' it find the id then it Update the Selected User data 
    else {
      this.usersService.putUserData(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.usersService.getUserList();
          this.modalRef.hide()
        });
    }
  }

  //Object Assogn to selected user for edit 
  showForEdit(template, user: Users) {
    this.usersService.selectedUser = Object.assign({}, user);
    this.modalRef = this.modalService.show(template);
  }

  //delete user - soft delete 
  onDelete(user, template) {
    this.selectedUser = user;
    this.modalRef = this.modalService.show(template, {class :"modal-lg"});
  }

  //Delete modal click - we can soft delete user by changing status of Active and Deactive
  onConfirm(template) {
    this.selectedUser.isActive = !this.selectedUser.isActive;
    // this.selectedUser.isActive = false;
    this.usersService.deleteUserData(this.selectedUser.id, this.selectedUser)
      .subscribe(data => {
        this.modalRef.hide();
        this.usersService.getUserList();
      });
  }

  //delete modal click - modal hide
  onCancel(form) {
    this.modalRef.hide();
    this.resetForm();
  }
}