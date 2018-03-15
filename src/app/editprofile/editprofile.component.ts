import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { EditService } from './edit.service';

@Component({
  selector: 'app-Editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  flag = false;      
  msg = "record added";
  userData: any = {
    firstname: '',
    lastname: '',
    contactno: ''
  };

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class :"modal-lg"});
  }
  
  constructor(private editervice: EditService, private modalService: BsModalService) {

    this.editervice.getData().subscribe((response) => {
      this.userData = response
    });
  }
  
  //Onclick on Submit Button- Edit User's Profile
  saveData() {
    this.editervice.putData(this.userData).subscribe((res) => {
      res.firstname = this.userData.firstName;
      res.lastname = this.userData.lastName;
      res.contactno = this.userData.contactNo;
      console.log(res.firstname);
      console.log(res.lastname);
      console.log(res.contactno);
      this.flag = true;
    })
  }
 
  ngOnInit() {
  }
}
