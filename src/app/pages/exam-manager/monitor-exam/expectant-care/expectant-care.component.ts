import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerAccountService } from 'src/app/authentication/services/manager-account.service';
import { MonitorModel, CandidateModel, ProgramModel } from '../../models/monitor.model';
import { ManageExpectantCareService } from '../../services/manage-expectant-care.service';
import { MonitorExpectantCareService } from '../../services/monitor-expectant-care.service';
import { Status } from "src/app/shared/enum/status";
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-expectant-care',
  templateUrl: './expectant-care.component.html',
  styleUrls: ['./expectant-care.component.scss']
})
export class ExpectantCareComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  expectantCareMonitor: MonitorModel;
  programs : ProgramModel[] = [];
  candidateStatus = Status;
  refreshTimerSub$: Subscription

  constructor(
    private managerAccountService: ManagerAccountService, 
    private monitorExpectantCareService: MonitorExpectantCareService,
    private manageExpectantCareService: ManageExpectantCareService
    ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor Expectant care', active: true },
    ];
    this.monitorExpectantCare(this.managerAccountService.getUser().examId);
    this.getProgramsTakingExpectantCare(this.managerAccountService.getUser().examId)
    this.refreshMonitorData()
  }

  monitorExpectantCare(examId: string) {
    this.monitorExpectantCareService.monitorExpectantCare(examId).subscribe({
      next: (data: MonitorModel) => {
        this.expectantCareMonitor = data;
        this.getCandidateStatus()
      },
    });
  }


  getCandidateStatus(){
    this.expectantCareMonitor.candidateList.forEach(candidate => {
      if(candidate.stamp != null){
        candidate.status = Status.COMPLETED
      }
      else{
        candidate.status =  Status.PENDING
      }
    });
  }
  monitorExpectantCareByProgram(examId: string, programId: string) {
    this.monitorExpectantCareService
      .monitorExpectantCareCandidatesByProgram(examId, programId)
      .subscribe({
        next: (data: CandidateModel[]) => {
          this.expectantCareMonitor.candidateList = data;
        },
      });
  }

  getProgramsTakingExpectantCare(examId: string){
    this.manageExpectantCareService.getProgramsTakingExpectantCare(examId).subscribe(
      {
        next:(value: ProgramModel[])=> {
          this.programs = value
        },

        error:(err: HttpErrorResponse)=> {
          console.log(err.error.message)
        },
      }
    )
  }
  
  // captureProgram(programId: string) {
  //   this.monitorExpectantCareByProgram(
  //     this.managerAccountService.getUser().examId,
  //     programId
  //   );
  // }

refreshMonitorData(){
  
 
    this.refreshTimerSub$ = timer(60000, 60000).subscribe((value)=>{
      this.monitorExpectantCare(this.managerAccountService.getUser().examId);
    })
 
  
}

  ngOnDestroy(): void {
  
    if(this.refreshTimerSub$ != null){
      this.refreshTimerSub$.unsubscribe()

    }
  }

}
