import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UiSwitchModule } from 'angular2-ui-switch';
import { AddparticipantComponent } from './training/addparticipant/addparticipant.component';
import { MyNewInterface } from './training/addparticipant/my-new-interface';
import { ParticipantService } from './training/addparticipant/participants.service';
import { GLOBAL } from './app.global';
import { TrainingComponent } from './training/training.component';
import { TrainingFormComponent } from './training/trainingform/trainingform.component';
import { TrainingService } from './training/training.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeService } from './change-password/change.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserFormComponent } from './user-form/user-form.component';
import { UserStatusPipe } from './user-form/user-status.pipe';
import { TrainingStatusPipe } from './training/training-status.pipe'
import { QuestionsService } from './training/add-que/questions.service';
import { AddQueComponent } from './training/add-que/add-que.component';
import { EditService } from './editprofile/edit.service'
import { HeaderComponent } from './header/header.component';
import { UsersService } from './user-form/users.service'
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ViewTrainingComponent } from './training/view-training/view-training.component';
import { HdComponent } from './hd/hd.component';
import { FooterComponent } from './footer/footer.component';
import {JasperoAlertsModule}from'@jaspero/ng2-alerts';
import {JasperoConfirmationsModule}from'@jaspero/ng2-confirmations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'trainingform', component: TrainingFormComponent },
  { path: 'training/:id', component: TrainingFormComponent },
  { path: 'training-view/:id', component: ViewTrainingComponent },
  { path: 'addparticipant', component: AddparticipantComponent },
  { path: 'add-que', component: AddQueComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddQueComponent,
    TrainingComponent,
    LoginComponent,
    UserStatusPipe,
    TrainingStatusPipe,
    UserFormComponent,
    LogoutComponent,
    TrainingComponent,
    TrainingFormComponent,
    AddparticipantComponent,
    DashboardComponent,
    ChangePasswordComponent,
    // UserManagmentComponent,
    HeaderComponent,
    EditprofileComponent,
    ViewTrainingComponent,
    HdComponent,
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    JasperoAlertsModule,
    JasperoConfirmationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    UiSwitchModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
  ],
  providers: [
    UsersService,
    TrainingService,
    QuestionsService,
    ChangeService,
    LoginService,
    ParticipantService,
    EditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
