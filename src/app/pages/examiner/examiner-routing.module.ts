import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesLogComponent } from "./activities-log/activities-log.component";
import { CandidateInstructionComponent } from "./candidate-instruction/candidate-instruction.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MarkExpectantCareComponent } from "./mark-expectant-care/mark-expectant-care.component";
import { MarkProcedureComponent } from "./mark-procedure/mark-procedure.component";
import { MarkResearchComponent } from "./mark-research/mark-research.component";
import { MarkVivaComponent } from "./mark-viva/mark-viva.component";
import { VivaComponent } from "../exam-manager/monitor-exam/viva/viva.component";
import { ProcedureInstructionComponent } from "./procedure-instruction/procedure-instruction.component";
import { MonitorExpectantCareComponent } from "./monitor/monitor-expectant-care/monitor-expectant-care.component";
import { MonitorResearchComponent } from "./monitor/monitor-research/monitor-research.component";
import { MonitorObjectiveStationComponent } from "./monitor/monitor-objective-station/monitor-objective-station.component";
import { MonitorVivaComponent } from "./monitor/monitor-viva/monitor-viva.component";
import { MonitorProcedureComponent } from "./monitor/monitor-procedure/monitor-procedure.component";
import { InstructionGuard } from "src/app/core/guards/instruction.guard";
const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DashboardComponent },
  { path: "candidate-instruction", component: CandidateInstructionComponent, canActivate: [InstructionGuard] },
  { path: "mark-research", component: MarkResearchComponent },
  { path: "mark-expectant-care", component: MarkExpectantCareComponent },
  { path: "mark-viva", component: MarkVivaComponent },
  { path: "mark-procedure", component: MarkProcedureComponent },
  { path: "procedure-instruction", component: ProcedureInstructionComponent, canActivate: [InstructionGuard] },
  // { path: "activity-logs", component: ActivitiesLogComponent },

  {
    path: "monitor",
    children: [
      { path: "expectant-care", component: MonitorExpectantCareComponent },
      { path: "objective-station", component: MonitorObjectiveStationComponent },
      { path: "research", component: MonitorResearchComponent },
      { path: "viva", component: MonitorVivaComponent },
      { path: "procedure", component: MonitorProcedureComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminerRoutingModule {}
