import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../user-form/users.service';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trainingList = [];
  notSubmitted: any = 0;
  closed: any = 0;
  constructor(private router: Router, private usersService: UsersService,
    private trainingService: TrainingService) { }

  ngOnInit() {
    this.usersService.getUserList();
    this.trainingService.getTrainingList()
      .subscribe((res) => {
        this.trainingList = res;
        this.trainingList.forEach((training) => {
          if (!training.isSubmitted) {
            this.notSubmitted++;
          }
          if (Date.parse(training.endDate) < Date.parse(new Date().toString())) {
            this.closed++;
          }
        })
      })
  }
}
