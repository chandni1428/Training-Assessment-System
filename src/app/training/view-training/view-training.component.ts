import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit {
  training: any = {};

  constructor(private router: Router, private route: ActivatedRoute, 
    public trainingService: TrainingService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.training.id = param["id"] || null;
    
      this.trainingService.getTrainingData(this.training.id)
        .subscribe((res) => {
          this.training = res;
        })
  })
}
}
