import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CandidateAccount, CandidateProcedure } from "src/app/authentication/model/candidate-account";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";
import { CandidateModel } from "../models/candidate";
import { CandidateExamItemsService } from "../services/candidate-exam-items.service";
import { CandidateExamService } from "../services/candidate-exam.service";
import { Location } from "@angular/common";
import { UtilitiesService } from "../services/utilities.service";
import { PassportService } from "../services/passport.service";


@Component({
  selector: "instruction-page",
  templateUrl: "./instruction-page.component.html",
  styleUrls: ["./instruction-page.component.scss"],
})
export class InstructionPageComponent implements OnInit, OnDestroy {
  timeLeft: number = 10;
  currentCandidate: CandidateAccount;
  candidateProcedures: CandidateProcedure[];
  processingStartExamIndex : number 
  processingStartExam : boolean = false
  image: any = null
  examInstruction : string = ''

  
  constructor(private router: Router, 
    private candidateExamItemsService:CandidateExamItemsService,  
    private candidateAccountService: CandidateAccountService, 
    private candidateExamService: CandidateExamService,
    private locationService: Location,
    private utilitiesService: UtilitiesService,
    private passportService: PassportService
    ) { }

  ngOnInit(): void { 
    this.getCurrentCandidate();
    // this.setCandidateItems(this.candidateData.candidateProcedureItems);
    this.getCandidateProcedures()
    this.getExamInstruction()
  }

   startExam(procedureId:string, objectiveDetailsId: string, examIndex: number) {
    this.processingStartExamIndex = examIndex
    this.processingStartExam = true
    this.candidateExamService.startExam(procedureId, objectiveDetailsId).subscribe(
      {next: (data: CandidateModel)=> {
        
        this.candidateExamItemsService.candidateExamDetails = data
        this.utilitiesService.isExamStarted = true
        this.processingStartExam = false
        this.processingStartExamIndex = null
      },
      complete :()=> {
        
        this.router.navigate(["candidate/exam"]);
      },
      error :(err: HttpErrorResponse)=> {
        console.log(err.error.messge)
       this.processingStartExam = false
       this.processingStartExamIndex = null
      },
    }
    )
   }


  getCurrentCandidate(){
     this.currentCandidate = this.candidateAccountService.getUser()
     this.fetchImage(this.currentCandidate.examNumber)
  }

  getCandidateProcedures(){
    this.candidateProcedures = this.currentCandidate.proceduresList
  }

  fetchImage(examNumber:string) {

    // console.log("about fetching",'/image/fetch/'+regNumber);
   
     examNumber = examNumber.toLocaleUpperCase();
   
     this.passportService.getPassport('/image/fetch/'+examNumber).subscribe(
   
       data => {
   
         // this.image =  data;
         this.createImageFromBlob(data);
      //   console.log(data, "this is data");
       },
       (err:HttpErrorResponse) =>{
         console.log(err);
       }
     );
   
   
   }
   
   createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
       this.image = reader.result;
     }, false);
   
     if (image) {
       reader.readAsDataURL(image);
     }
   }

 goBack(){
    this.locationService.back()
 }

 getExamInstruction(){
  this.examInstruction = ""
 }

 ngOnDestroy(): void {

  this.processingStartExam = false
  this.processingStartExamIndex = null
 }
}
