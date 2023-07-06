import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, timer } from "rxjs";
import {
  ActivityScore,
  CandidateGradedProcedureDTO,
  ProcedureModel,
} from "../models/procedure.model";
import { MarkProcedureService } from "../services/mark-procedure.service";
import { ExaminerAccountService } from "src/app/authentication/services/examiner-account.service";
import { ExaminerAccount } from "src/app/authentication/model/examiner-account";
import { ResourceCreated } from "../../exam-manager/models/resource.created";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { PassportService } from "../services/passport.service";

@Component({
  selector: "app-mark-procedure",
  templateUrl: "./mark-procedure.component.html",
  styleUrls: ["./mark-procedure.component.scss"],
})
export class MarkProcedureComponent implements OnInit, OnDestroy {
  breadCrumbItems!: Array<{}>;
  isFound: boolean = false;
  currentExaminer: ExaminerAccount;
  candidateToGrade: ProcedureModel = null;
  candidateActivitiesLength: number;
  isAssessmentOn: boolean = false;
  timerSub$: Subscription;
  autoSaveSub$: Subscription;
  completedActivities = [];
  endExamTimerSub$: Subscription;
  processingEndExam: boolean = false;
  modalOption: NgbModalOptions = {};
  totalMaxScore: number = 0
  processingSearch : boolean = false
  image: any = null


  constructor(
    private modalService: NgbModal,
    private markProcedureService: MarkProcedureService,
    private examinerAccountService: ExaminerAccountService,
    private readonly notifierService: NotifierService,
    private passportService: PassportService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Examiner" },
      { label: "Mark Procedure", active: true },
    ];

    this.getCurrentExaminer();
    if(this.candidateToGrade != null){
      this.checkForWarning();
    }
   
  }

  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openGrader(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openActivitiesModal(content: any) {
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "fullscreen";
    this.modalOption.windowClass = "modal-holder";
    this.modalOption.scrollable = true;
    this.modalService.open(content, this.modalOption);
  }

  cancel() {
    this.modalService.dismissAll();
  }

  grader(index: number, grade: string, activityId: string) {
    // this.candidateToGrade.activities[index].score = this.convertFractionToScore(grade);

    let response = {
      activityId: activityId,
      score: this.convertFractionToScore(grade),
    };

    var activityAttempted =
      this.candidateToGrade.candidateDetails.activitiesScores.find(
        (activity) => activity.activityId == response.activityId
      );

    if (activityAttempted == null) {
      this.candidateToGrade.candidateDetails.activitiesScores.push(response);
    } else {
      activityAttempted.score = response.score;
    }

    /* if(this.checkIfActivityAttempted(response.activityId, response.score) === false){
      this.candidateToGrade.candidateDetails.activitiesScores.push(response)
    }else{
      this.candidateToGrade.candidateDetails.activitiesScores.forEach(element => {
        if(element.activityId === response.activityId){
          element.score =response.score
        }
      });
    }*/

    // console.log(this.candidateToGrade.activities[index]);
    // console.log(response);
  }

  checkIfActivityAttempted(id: string, score: number): boolean {
    var activity = this.candidateToGrade.candidateDetails.activitiesScores.find(
      (activity) => activity.activityId === id && activity.score == score
    );

    return activity == null ? false : true;
  }

  convertFractionToScore(fraction: string): number {
    if (fraction == "0") {
      return 0;
    } else if (fraction == "1/4") {
      return 0.25;
    } else if (fraction == "1/2") {
      return 0.5;
    } else if (fraction == "1") {
      return 1;
    } else {
      return 2;
    }
  }


  getTotalActivitiesScore(){
    this.candidateToGrade.activities.forEach(activity => {
       this.totalMaxScore += activity.maxScore
       
    });
  }

  setGradeList() {
    for (let i = 0; i < this.candidateToGrade.activities.length; i++) {
      this.candidateToGrade.activities[i].gradeList = [];
      if (this.candidateToGrade.activities[i].maxScore === 1) {
        this.candidateToGrade.activities[i].gradeList = [
          "0",

          "1/4",

          "1/2",

          "1",
        ];
      } else if (this.candidateToGrade.activities[i].maxScore === 2) {
        this.candidateToGrade.activities[i].gradeList = [
          "0",
          "1/4",

          "1/2",

          "1",
          "2",
        ];
      } else if (this.candidateToGrade.activities[i].maxScore === 0.5) {
        this.candidateToGrade.activities[i].gradeList = [
          "0", 
          "1/4",
          "1/2"
        ];
      } else if (this.candidateToGrade.activities[i].maxScore === 0.25) {
        this.candidateToGrade.activities[i].gradeList = [
          "0", 
          "1/4"
        ];
      }
    }
  }

  getCandidateToGrade(
    examId: string,
    examinerId: string,
    programId: string,
    procedureId: string,
    examNumber: string
  )
  {
    this.processingSearch = true
    if (examNumber == "") {
      this.notifierService.notify(
        "error",
        "Please enter candidate exam number"
      );

      return;
    }
    this.isFound = false;
  
    this.markProcedureService
      .getCandidateToGrade(
        examId,
        examinerId,
        programId,
        procedureId,
        examNumber
      )
      .subscribe({
        next: (data: ProcedureModel) => {
          this.totalMaxScore = 0
          this.candidateToGrade = data;
          if (this.candidateToGrade.candidateDetails.activitiesScores == null) {
            this.candidateToGrade.candidateDetails.activitiesScores = [];
          }
          this.isFound = true;
          this.setGradeList();
          this.getTotalActivitiesScore()
          this.fetchImage(examNumber)
          this.processingSearch = false
        },
        complete: () => {
          this.candidateActivitiesLength =
            this.candidateToGrade.activities.length;

          // console.log(this.candidateToGrade);
        },
        error: (err: HttpErrorResponse) => {
          this.notifierService.notify("error", err.error.message);
          this.processingSearch = false
        },
      });
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


  // startAutoSave() {
  //   if (!this.isAssessmentOn) {
  //     return;
  //   }

  //   this.autoSaveSub$ = timer(30 * 1000, 30 * 1000).subscribe((value) => {
  //     this.autoSaveCandidateProcedure(this.generatePayload());
  //   });
  // }

  displayTimerText(): string {
    let minute = this.candidateToGrade.candidateDetails.minute;
    let seconds = this.candidateToGrade.candidateDetails.seconds;

    let minuteText = minute < 10 ? "0" + minute : "" + minute;
    let secondsText = seconds < 10 ? "0" + seconds : "" + seconds;

   
    

    return minuteText + " : " + secondsText;
  }

  checkForWarning(){
  
    if((this.candidateToGrade.candidateDetails.minute == 3) &&
     (this.candidateToGrade.candidateDetails.seconds == 0 )){
      this.displayWarning('You have used 7 minutes for this assessment');
     
      
    }
    if((this.candidateToGrade.candidateDetails.minute == 2) && 
    (this.candidateToGrade.candidateDetails.seconds == 0 )){

      
    
      this.displayWarning('You have used 8 minutes for this assessment');
    
    }
    if((this.candidateToGrade.candidateDetails.minute == 1) &&
     (this.candidateToGrade.candidateDetails.seconds == 0 )){

      
      this.displayWarning('You have used 9 minutes for this assessment');
      
    }
  }

  displayWarning(message: string) {
    
    // this.displayWarningTimer = true
      this.notifierService.notify(
        "error",
        message
      );
      this.playAudio();
      
    
  }

  startWarningTimerAnimation(): boolean{
    if((this.candidateToGrade.candidateDetails.minute <= 3  
      && this.candidateToGrade.candidateDetails.minute >= 0) 
    && (this.candidateToGrade.candidateDetails.seconds >= 0 
      && this.candidateToGrade.candidateDetails.seconds <= 59)){
      return true
    }
    return false
  }
  

  playAudio(){
    let audio = new Audio();
    audio.src = "assets/sound/beep-04.wav";
    audio.load();
    audio.play();
  }


  startTimer() {
    this.timerSub$ = timer(1000, 1000).subscribe((value) => {
      if (this.candidateToGrade.candidateDetails.seconds == 0) {
        --this.candidateToGrade.candidateDetails.minute;
        this.candidateToGrade.candidateDetails.seconds = 59;

        /* if(this.candidateToGrade.candidateDetails.minute  != 0){
                
                -- this.candidateToGrade.candidateDetails.minute;
            }*/
      } else {
        --this.candidateToGrade.candidateDetails.seconds;
      }

      this.checkForWarning()
      if(this.candidateToGrade.candidateDetails.seconds % 30 == 0){
        this.autoSaveCandidateProcedure(this.generatePayload())
      }

      if (
        this.candidateToGrade.candidateDetails.minute == 0 &&
        this.candidateToGrade.candidateDetails.seconds == 0
      ) {
        // end exam and cancel subscription
        this.endExamTimer(true);
        //this.endExam(true)
        return;
      }
    });
  }

  startAssessment(content: any) {
    this.isAssessmentOn = true;
    this.openActivitiesModal(content);
    this.startTimer();
    // this.startAutoSave();
  }

  autoSaveCandidateProcedure(payload: CandidateGradedProcedureDTO) {
    this.markProcedureService.autoSaveCandidateProcedure(payload).subscribe({
      next: (data: ResourceCreated) => { },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  generatePayload(): CandidateGradedProcedureDTO {
    let payload: CandidateGradedProcedureDTO = {
      candidateId: this.candidateToGrade.candidateDetails.id,
      minute: this.candidateToGrade.candidateDetails.minute,
      seconds: this.candidateToGrade.candidateDetails.seconds,
      candidateProcedureActivitiesId:
        this.candidateToGrade.candidateProcedureActivitiesId,
      candidateProcedureDetailsId:
        this.candidateToGrade.candidateProcedureDetailsId,
      programId: this.currentExaminer.programId,
      procedureId: this.currentExaminer.procedureId,
      activityScores: this.candidateToGrade.candidateDetails.activitiesScores,
    };
    // console.log(payload);
    return payload;
  }

  endExam(timedOut: boolean) {
    this.processingEndExam = true;
    if(this.timerSub$ != null){
      this.timerSub$.unsubscribe();
    }
    
    // this.autoSaveSub$.unsubscribe();
    this.isAssessmentOn = false;
    this.markProcedureService
      .endExam(timedOut, this.generatePayload())
      .subscribe({
        next: (data) => {
          // console.log(data);
          Swal.close();
          this.cancel();
          if(this.endExamTimerSub$ != null){
            this.endExamTimerSub$.unsubscribe();
          }
          
          this.candidateActivitiesLength = 0;
          this.completedActivities = [];
          this.candidateToGrade = null;
          this.processingEndExam =false
          // this.displayWarningTimer = false
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.processingEndExam = false;
        },
        complete: () => { },
      });
  }

  getCurrentExaminer() {
    this.currentExaminer = this.examinerAccountService.getUser();
    // return this.currentExaminer
  }

  showExamEndingLoader() {
    Swal.fire({
      title: "Processing Please wait",
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  /* confirm(): void {
    Swal.fire({
      title: "Are you sure you want to end this assessment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(3, 142, 220)",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Yes, end exam!",
    }).then((result) => {
      if (result.value) { */
  openEndExamConfirmationDialog(modal: any) {
    this.modalService.open(modal);
  }

  endExamTimer(timedOut: boolean) {
    this.showExamEndingLoader();
    this.endExamTimerSub$ = timer(0, 5000).subscribe((value) => {
      if (this.processingEndExam == true) {
        return;
      }

      this.endExam(timedOut);
    });
  }

  ngOnDestroy(): void {
    if (this.autoSaveSub$ != null) {
      this.autoSaveSub$.unsubscribe();
    }

    if (this.timerSub$ != null) {
      this.timerSub$.unsubscribe();
    }
    if (this.endExamTimerSub$ != null) {
      this.endExamTimerSub$.unsubscribe();
    }

    // this.displayWarningTimer = false
    this.candidateToGrade = null;
    this.completedActivities = [];
    this.totalMaxScore = 0
    this.isFound = false

  }
}
