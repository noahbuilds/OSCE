import { Component, OnDestroy, OnInit } from "@angular/core";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import {
  CandidateModel,
  ProgramModel,
  MonitorModel,
} from "../../models/monitor.model";
import { MonitorVivaService } from "../../services/monitor-viva.service";
import { ManageVivaService } from "../../services/manage-viva.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Status } from "src/app/shared/enum/status";
import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-viva",
  templateUrl: "./viva.component.html",
  styleUrls: ["./viva.component.scss"],
})
export class VivaComponent implements OnInit, OnDestroy {
  breadCrumbItems!: Array<{}>;
  vivaMonitor: MonitorModel;
  programs: ProgramModel[] = [];
  candidateStatus = Status;
  refreshTimerSub$: Subscription

  constructor(
    private manageVivaService: ManageVivaService,
    private monitorVivaService: MonitorVivaService,
    private managerAccountService: ManagerAccountService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Monitor VIVA", active: true },
    ];

    this.monitorViva(this.managerAccountService.getUser().examId);
    this.getProgramsTakingViva(this.managerAccountService.getUser().examId);
    this.refreshMonitorData()
  }

  monitorViva(examId: string) {
    this.monitorVivaService.monitorViva(examId).subscribe({
      next: (data: MonitorModel) => {
        this.vivaMonitor = data;
        this.getCandidateStatus()
      },
    });
  }

  monitorVivaByProgram(examId: string, programId: string) {
    this.monitorVivaService
      .monitorVivaCandidatesByProgram(examId, programId)
      .subscribe({
        next: (data: CandidateModel[]) => {
          this.vivaMonitor.candidateList = data;
          this.getCandidateStatus()
        },
      });
  }


  getCandidateStatus(){
    this.vivaMonitor.candidateList.forEach(candidate => {
      if(candidate.stamp != null){
        candidate.status = Status.COMPLETED
      }
      else{
        candidate.status =  Status.PENDING
      }
    });
  }
  getProgramsTakingViva(examId: string) {
    this.manageVivaService.getProgramsTakingViva(examId).subscribe({
      next: (data: ProgramModel[]) => {
        this.programs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  captureProgram(programId: string) {
    this.monitorVivaByProgram(
      this.managerAccountService.getUser().examId,
      programId
    );
    
  }

  refreshMonitorData(){
    
      this.refreshTimerSub$ = timer(60000, 60000).subscribe((value)=>{
        this.monitorViva(this.managerAccountService.getUser().examId)
      })
    
    
  }

  ngOnDestroy(): void {
    if(this.refreshTimerSub$ != null){
      this.refreshTimerSub$.unsubscribe()
    }
    
    
  }
}
