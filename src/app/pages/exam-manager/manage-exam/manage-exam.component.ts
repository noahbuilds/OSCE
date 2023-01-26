import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProgramModel } from "../models/program.model";
import { ManageExamService } from "../services/manage-exam.service";
import { NotifierService } from "angular-notifier";
import { Subscription } from "rxjs";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import { ManagerAccount } from "src/app/authentication/model/manager-account";
import { StartExamComponent } from "../start-exam/start-exam.component";
import { UtilitiesService } from "../services/utilities.service";
import { ManageOsceService } from "../services/manage-osce.service";
import { ManageVivaService } from "../services/manage-viva.service";
import { ResourceCreated } from "../models/resource.created";

@Component({
  selector: "app-manage-exam",
  templateUrl: "./manage-exam.component.html",
  styleUrls: ["./manage-exam.component.scss"],
})
export class ManageExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  programList: Array<ProgramModel>;
  currentManager: ManagerAccount;
  programIDForCandidateSync: string;
  programIDForExaminerSync: string;
  

  @ViewChild(StartExamComponent)startExamRef!: StartExamComponent; 

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private manageExamService: ManageExamService,
    private readonly notifier: NotifierService,
    private managerAccountService: ManagerAccountService,
    private utilitiesService: UtilitiesService,
    private manageOsceService: ManageOsceService,
    private manageVivaService: ManageVivaService
  ) {}

 

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Manage exam", active: true },
    ];
    this.currentManager = this.managerAccountService.getUser();

   console.log(this.currentManager)
  }

isOsceOn(): boolean{
  return this.utilitiesService.osceStarted
}

isVivaOn(): boolean{
  return this.utilitiesService.vivaStarted
}

endOsce(){
  this.manageOsceService.endOsce(this.currentManager.examId).subscribe(
    {
      next:(value) =>{
        
      },
      error:(err: HttpErrorResponse)=> {
        this.notifier.notify('error', err.error.message)
      },
      complete:()=> {
        this.notifier.notify('success', 'OSCE ended Successfull')
      },
    }
  )
}
endViva(){
  this.manageVivaService.endViva(this.currentManager.examId).subscribe(
    {
      next:(value) =>{
        
      },
      error:(err: HttpErrorResponse)=> {
        this.notifier.notify('error', err.error.message)
      },
      complete:()=> {
        this.notifier.notify('success', 'VIVA ended Successfull')
      },
    }
  )
}

closeModal(){
  this.modalService.dismissAll()
}

  openSynchronizeCandidateModal(content: any) {
    this.getPrograms(this.currentManager.examId);
    this.modalService.open(content, { size: "md", centered: true });
  }

  openEndOsceConfirmationModal(content: any){
    this.modalService.open(content, { size: "md", centered: true });

  }

  openEndVivaConfirmationModal(content: any){
    this.modalService.open(content, { size: "md", centered: true });

  }



  openSynchronizeExaminerModal(content: any) {
    this.getPrograms(this.currentManager.examId);
    this.modalService.open(content, { size: "md", centered: true });
  }

  getPrograms(examId: string) {
     this.manageExamService.getPrograms(examId).subscribe({
      next: (data: ProgramModel[]) => {
        this.programList = data;
      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
      },
      complete: () => {},
    });
  }

  synchronizePrograms(examId: string) {
     this.manageExamService.synchronizePrograms(examId).subscribe({
      next: (value:ProgramModel[]) => {
        this.notifier.notify("success", `${value.length} Program(s) Added Successfully`);

      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
      },
     
    });
  }

  captureProgramForCandidate(capturedProgramId: string) {
    this.programIDForCandidateSync = capturedProgramId;
  }

  captureProgramForExaminer(capturedProgramId: string) {
    this.programIDForExaminerSync = capturedProgramId;
  }

  synchronizeExaminers() {
    if(this.programIDForExaminerSync == null){
      this.notifier.notify('error', "Please select a program")

      return
    }
     this.manageExamService
      .synchronizeExaminers(
        this.currentManager.examId,
        this.programIDForExaminerSync
      )
      .subscribe({
        next: (value) => {
          this.notifier.notify("success", "Succefully Synchronized Examiners");
          this.programIDForExaminerSync = null
          this.closeModal()
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.programIDForExaminerSync = null
          this.closeModal()
        },
        complete: () => {
        
        },
      }); 
  }

  synchronizeCandidates() {
    
    if(this.programIDForCandidateSync == null){
      this.notifier.notify('error', "Please select a program")

      return
    }
     this.manageExamService
      .synchronizeCandidates(
        this.currentManager.examId,
        this.programIDForCandidateSync
      )
      .subscribe({
        next: (value: ResourceCreated) => {
          this.notifier.notify("success", `${value.id}`);
          this.programIDForCandidateSync = null
          this.closeModal()
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.programIDForCandidateSync = null
          this.closeModal()
        },
        complete: () => {
          // this.notifier.notify("success", "Succefully Synchronized Candidates");
          
        },
      });
  }
}
