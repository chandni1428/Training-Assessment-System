import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

    transform(value: any) {

        switch (value) {
            case 1:
                return "<span class='label label-success'>Active</span>";
            case true:
                return "<span class='label label-success'>Active</span>";
            case 0:
                return "<span class='label label-danger'>Inactive</span>";
            case false:
                return "<span class='label label-danger'>Inactive</span>";
            default:
                return "<span class='label label-success'>Active</span>";
        }
    }
}