import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesLogComponent } from "./activities-log/activities-log.component";
// import { ActivitiesLogComponent } from './activities-log/activities-log.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DownloadExamComponent } from "./download-exam/download-exam.component";
import { DownloadedExamsComponent } from "./downloaded-exams/downloaded-exams.component";
import { AllowReloginComponent } from "./manage-exam/allow-relogin/allow-relogin.component";
import { CandidateLookupComponent } from "./manage-exam/candidate-lookup/candidate-lookup.component";
import { ManageExamComponent } from "./manage-exam/manage-exam.component";
import { ExpectantCareComponent } from "./monitor-exam/expectant-care/expectant-care.component";
import { MonitorExamComponent } from "./monitor-exam/monitor-exam.component";


import { ResearchComponent } from "./monitor-exam/research/research.component";
import { VivaComponent } from "./monitor-exam/viva/viva.component";
import { StartExamComponent } from "./start-exam/start-exam.component";
import { WhiteListComponent } from "./white-list/white-list.component";
import { OsceComponent } from "./monitor-exam/osce/osce.component";
import { DownloadedExamDetailsComponent } from "./downloaded-exams/downloaded-exam-details/downloaded-exam-details.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DashboardComponent },
  { path: "download-exam", component: DownloadExamComponent },
  { path: "activities-logs", component: ActivitiesLogComponent },
  { path: "white-list", component: WhiteListComponent },
  { path: "start-exam", component: StartExamComponent },

  {path: "downloaded-exams", component: DownloadedExamsComponent},
  {path: "downloaded-exams", 
children: [{

  path: 'details/:programName/:examId/:programId', component: DownloadedExamDetailsComponent
}]},
  {
    path: "monitor-exam",
    children: [
      { path: "expectant-care", component: ExpectantCareComponent },
      { path: "research", component: ResearchComponent },
      { path: "viva", component: VivaComponent },
      { path: "osce", component: OsceComponent },
    ],
  },
  { path: "manage-exam", component: ManageExamComponent },
  {
    path: "manage-exam",
    children: [
      {
        path: "candidate-lookup",
        component: CandidateLookupComponent
      },
      {
        path: "allow-relogin",
        component: AllowReloginComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamManagerRoutingModule {}
