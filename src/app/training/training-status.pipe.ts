import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trainingStatus'
})
export class TrainingStatusPipe implements PipeTransform {

    transform(value:boolean) {

        switch (value) {
            case true:
                return "<span class='label label-success'>Submitted</span>";
            case false:
                return "<span class='label label-warning'>Save as draft</span>";
            default:
                return "<span class='label label-warning'>Save as draft</span>";
        }
    }
}