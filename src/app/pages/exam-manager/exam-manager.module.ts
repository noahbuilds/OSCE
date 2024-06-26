import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExamManagerRoutingModule } from './exam-manager-routing.module';
import { DownloadExamComponent } from './download-exam/download-exam.component';
import { StartExamComponent } from './start-exam/start-exam.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivitiesLogComponent } from './activities-log/activities-log.component';
import { ExpectantCareComponent } from './monitor-exam/expectant-care/expectant-care.component';
import { VivaComponent } from './monitor-exam/viva/viva.component';
import { ResearchComponent } from './monitor-exam/research/research.component';
import { CandidateLookupComponent } from './manage-exam/candidate-lookup/candidate-lookup.component';
import { AllowReloginComponent } from './manage-exam/allow-relogin/allow-relogin.component';
import { DownloadedExamsComponent } from './downloaded-exams/downloaded-exams.component';
import { OsceComponent } from './monitor-exam/osce/osce.component';
import { DownloadedExamDetailsComponent } from './downloaded-exams/downloaded-exam-details/downloaded-exam-details.component';
import {  NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from "simplebar-angular";
import {TableModule} from 'primeng/table'
import { NgbPaginationModule, NgbTypeaheadModule, NgbTooltipModule, NgbDropdownModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadPassportComponent } from './download-passport/download-passport.component';


@NgModule({
  declarations: [
    DownloadExamComponent,
    StartExamComponent,
    WhiteListComponent,
    ManageExamComponent,
    DashboardComponent,
    ActivitiesLogComponent,
    ExpectantCareComponent,
    VivaComponent,
    ResearchComponent,
    CandidateLookupComponent,
    AllowReloginComponent,
    DownloadedExamsComponent,
    OsceComponent,
    DownloadedExamDetailsComponent,
    DownloadPassportComponent
  ],
  imports: [
    CommonModule,
    ExamManagerRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    TableModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgbAccordionModule,

  ]
})
export class ExamManagerModule { }
