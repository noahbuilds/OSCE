import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { ExaminerRoutingModule } from './examiner-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateInstructionComponent } from './candidate-instruction/candidate-instruction.component';
import { MarkResearchComponent } from './mark-research/mark-research.component';
import { MarkVivaComponent } from './mark-viva/mark-viva.component';
import { MarkExpectantCareComponent } from './mark-expectant-care/mark-expectant-care.component';
import { ProcedureInstructionComponent } from './procedure-instruction/procedure-instruction.component';
import { MonitorExpectantCareComponent } from './monitor/monitor-expectant-care/monitor-expectant-care.component';
import { MonitorObjectiveStationComponent } from './monitor/monitor-objective-station/monitor-objective-station.component';
import { MonitorProcedureComponent } from './monitor/monitor-procedure/monitor-procedure.component';
import { MonitorResearchComponent } from './monitor/monitor-research/monitor-research.component';
import { MonitorVivaComponent } from './monitor/monitor-viva/monitor-viva.component';
import { MarkProcedureComponent } from './mark-procedure/mark-procedure.component';
import { ActivitiesLogComponent } from './activities-log/activities-log.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimplebarAngularModule } from "simplebar-angular";
import { MonitorProcedureTableComponent } from './monitor/monitor-procedure-table/monitor-procedure-table.component';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    DashboardComponent,
    CandidateInstructionComponent,
    MarkResearchComponent,
    MarkVivaComponent,
    MarkExpectantCareComponent,
    ProcedureInstructionComponent,
    
    MonitorExpectantCareComponent,
    MonitorObjectiveStationComponent,
    MonitorProcedureComponent,
    MonitorResearchComponent,
    MonitorVivaComponent,
    MarkProcedureComponent,
    ActivitiesLogComponent,
    MonitorProcedureTableComponent
  ],
  imports: [
    CommonModule,
    ExaminerRoutingModule,
    SharedModule,
    SimplebarAngularModule,
    NgbModalModule,
    NgSelectModule,
    TableModule,
    ScrollPanelModule
  ]
})
export class ExaminerModule { }
