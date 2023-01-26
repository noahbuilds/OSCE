import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CandidateAccount, CandidateProcedure } from "src/app/authentication/model/candidate-account";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";
import { CandidateModel, CandidateProcedureItem } from "../models/candidate";
import { CandidateExamItemsService } from "../services/candidate-exam-items.service";
import { CandidateExamService } from "../services/candidate-exam.service";

import { TimeService } from "../services/time.service";



@Component({
  selector: "instruction-page",
  templateUrl: "./instruction-page.component.html",
  styleUrls: ["./instruction-page.component.scss"],
})
export class InstructionPageComponent implements OnInit {
  timeLeft: number = 10;
  currentCandidate: CandidateAccount;
  candidateProcedures: CandidateProcedure[];
  candidateData: CandidateModel
  
  constructor(private router: Router, private candidateExamItemsService:CandidateExamItemsService, private timeSerivice: TimeService, private candidateAccountService: CandidateAccountService, private candidateExamService: CandidateExamService) { }

  ngOnInit(): void { 
    this.getCurrentCandidate();
    // this.setCandidateItems(this.candidateData.candidateProcedureItems);
    this.getCandidateProcedures()
  }

   startExam(procedureId:string, objectiveDetailsId: string) {

    this.candidateExamService.startExam(procedureId, objectiveDetailsId).subscribe(
      {next: (data: CandidateModel)=> {
        
        this.candidateExamItemsService.candidateExamDetails = data
      },
      complete :()=> {
        this.router.navigate(["candidate/exam"]);
      },
      error :(err: HttpErrorResponse)=> {
        console.log(err.error.messge)
      },
    }
    )
   }

 
  endExam() {
    this.router.navigate(["candidate/end-exam"]);
    console.log("exam has ended");
  }

  getCurrentCandidate(){
     this.currentCandidate = this.candidateAccountService.getUser()
  }

  getCandidateProcedures(){
    this.candidateProcedures = this.currentCandidate.proceduresList
  }

  // setCandidateItems(items: CandidateProcedureItem[]){
  //   this.candidateExamItemsService.setExamItems(items)
  // }
}
