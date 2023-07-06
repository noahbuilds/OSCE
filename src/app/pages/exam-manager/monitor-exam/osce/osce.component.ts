import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";

import {
  OsceMonitor,
  OsceMonitorCard,
} from "../../models/osce-monitor.model";
import { ProgramModel } from "../../models/program.model";
import { ManageExamService } from "../../services/manage-exam.service";
import { MonitorOsceService } from "../../services/monitor-osce.service";

@Component({
  selector: "app-osce",
  templateUrl: "./osce.component.html",
  styleUrls: ["./osce.component.scss"],
})
export class OsceComponent implements OnInit, OnDestroy {
  breadCrumbItems!: Array<{}>;
  monitorCards: OsceMonitorCard[] = [];
  proceduresToMonitor: OsceMonitor[] = [];
  objectivesToMonitor: OsceMonitor[] = [];
  programs: ProgramModel[] = [];
  refreshCardTimerSub$: Subscription;
  refreshObjectiveTimerSub$: Subscription;
  refreshProcedureTimerSub$: Subscription;

  constructor(
    private monitorOsceService: MonitorOsceService,
    private managerAccountService: ManagerAccountService,
    private manageExamService: ManageExamService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Monitor OSCE", active: true },
    ];

    this.getMonitorCards(this.managerAccountService.getUser().examId);
    this.getPrograms(this.managerAccountService.getUser().examId);
    this.refreshMonitorCard()
    // console.log(this.managerAccountService.getUser().examId);
  }

  getMonitorCards(examId: string) {
    this.monitorOsceService.getMonitorCards(examId).subscribe({
      next: (cards: OsceMonitorCard[]) => {
        this.monitorCards = cards;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  monitorProcedures(examId: string, programId: string) {
    this.monitorOsceService.monitorProcedures(examId, programId).subscribe({
      next: (data: OsceMonitor[]) => {
        this.proceduresToMonitor = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  monitorObjectives(examId: string, programId: string) {
    this.monitorOsceService.monitorObjectives(examId, programId).subscribe({
      next: (data: OsceMonitor[]) => {
        this.objectivesToMonitor = data;
      },
    });
  }

  captureProgramForObjective(programId: string) {
    this.monitorObjectives(
      this.managerAccountService.getUser().examId,
      programId
    );
    if(this.refreshObjectiveTimerSub$ != null){
      this.refreshObjectiveTimerSub$.unsubscribe()
    }
    this.refreshMonitorObjective(this.managerAccountService.getUser().examId,
    programId)
  }

  captureProgramForProcedure(programId: string) {
    this.monitorProcedures(
      this.managerAccountService.getUser().examId,
      programId
    );
    if(this.refreshProcedureTimerSub$ != null){
      this.refreshProcedureTimerSub$.unsubscribe()
    }
    this.refreshMonitorProcedure(this.managerAccountService.getUser().examId,
    programId)

  }

  getPrograms(examId: string) {
    this.manageExamService.getPrograms(examId).subscribe({
      next: (programs: ProgramModel[]) => {
        this.programs = programs;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  refreshMonitorCard(){
    this.refreshCardTimerSub$ = timer(60000, 60000).subscribe((value)=>{
    this.getMonitorCards(this.managerAccountService.getUser().examId);

    })
  }

  refreshMonitorProcedure(examId:string, programId: string){
    this.refreshProcedureTimerSub$ = timer(60000, 60000).subscribe((value)=>{
      this.monitorProcedures(examId,programId);
    })
  }

  refreshMonitorObjective(examId: string, programId: string){
    this.refreshObjectiveTimerSub$ = timer(60000, 60000).subscribe((value)=>{
      this.monitorObjectives(examId, programId)
    })

  }

  ngOnDestroy(): void {
   if(this.refreshCardTimerSub$ != null){
      this.refreshCardTimerSub$.unsubscribe()
   }
   if(this.refreshObjectiveTimerSub$ != null){
    this.refreshObjectiveTimerSub$.unsubscribe()
   }
   if(this.refreshProcedureTimerSub$ != null){
    this.refreshProcedureTimerSub$.unsubscribe()
   }
  
  }
}
