import { Component, OnInit } from '@angular/core';
import { MonitorResearchService } from '../../services/monitor-research.service';
import { MonitorModel, CandidateModel, ProgramModel } from '../../models/monitor.model';
import { ManagerAccountService } from 'src/app/authentication/services/manager-account.service';
import { ManageResearchService } from '../../services/manage-research.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from "src/app/shared/enum/status";
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  researchMonitor: MonitorModel;
  programs: ProgramModel[]= [] 
  candidateStatus = Status;
  refreshTimerSub$: Subscription

  constructor(private monitorResearchService: MonitorResearchService, 
    private managerAccountService: ManagerAccountService,
    private manageResearchService: ManageResearchService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor Research', active: true },
    ];

    this.monitorResearch(this.managerAccountService.getUser().examId)
    this.getProgramsTakingResearch(this.managerAccountService.getUser().examId)
    this.refreshMonitorData()
    
  }

  monitorResearch(examId: string) {
    this.monitorResearchService.monitorResearch(examId).subscribe({
      next: (data: MonitorModel) => {
        this.researchMonitor = data;
        this.getCandidateStatus()
        
      },
      
    });
  }

  getCandidateStatus(){
    this.researchMonitor.candidateList.forEach(candidate => {
      if(candidate.stamp != null){
        candidate.status = Status.COMPLETED
      }
      else{
        candidate.status =  Status.PENDING
      }
    });
  }

  monitorResearchByProgram(examId: string, programId: string) {
    this.monitorResearchService
      .monitorResearchCandidatesByProgram(examId, programId)
      .subscribe({
        next: (data: CandidateModel[]) => {
          this.researchMonitor.candidateList = data;
        },
      });
  }


  getProgramsTakingResearch(examId: string){
    this.manageResearchService.getProgramsTakingResearch(examId).subscribe(
      {
        next: (value: ProgramModel[])=> {
          this.programs =value
        },

        error:(err: HttpErrorResponse)=> {
          console.log(err.error.message)
        },
      }
    )
  }
  
  captureProgram(programId: string) {
    this.monitorResearchByProgram(
      this.managerAccountService.getUser().examId,
      programId
    );
  }

  refreshMonitorData(){
    
      this.refreshTimerSub$ = timer(60000, 60000).subscribe((value)=>{
        this.monitorResearch(this.managerAccountService.getUser().examId)
      })
   
    
  }

  ngOnDestroy(): void {
    if(this.refreshTimerSub$ != null){
      this.refreshTimerSub$.unsubscribe()
    }
    
    
  }
}
