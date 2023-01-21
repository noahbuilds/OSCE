import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import Swal from "sweetalert2";
import { TimeService } from "../services/time.service";

import { CandidateExamItemsService } from "../services/candidate-exam-items.service";
import {
  CandidateModel,
  CandidateProcedureItem,
  CandidateResponseDTO,
} from "../models/candidate";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";
import { CandidateAccount } from "src/app/authentication/model/candidate-account";
import { CandidateExamService } from "../services/candidate-exam.service";
import { HttpErrorResponse } from "@angular/common/http";
import { StandardChoiceComponent } from "./standard-choice/standard-choice.component";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.scss"],
})
export class ExamPageComponent implements OnInit, OnDestroy {
  timeLeft: number = 10;
  timerSub: Subscription;
  item: CandidateProcedureItem;
  currentQuestionNumber: number = 0;
  currentQuestion: CandidateProcedureItem;
  itemsLength: number;
  keyPressed: string = "";
  shortcutKeys: string[] = ["a", "b", "c", "d"];
  attemptedQuestions: any[] = [];
  candidateExamDetails: CandidateModel;
  currentCandidate: CandidateAccount;
  isAssessmentOn: boolean = false;
  autoSaveSub$: Subscription;
  timerSub$: Subscription;

  @ViewChild(StandardChoiceComponent)
  standandChoiceRef!: StandardChoiceComponent;

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyPressed = event.key;
    //shortCuts

    this.useShortcut();
  }
  constructor(
    private router: Router,
    private timeService: TimeService,
    private candidateExamItemsService: CandidateExamItemsService,
    private candidateAccountService: CandidateAccountService,
    private candidateExamService: CandidateExamService
  ) {}

  ngOnInit(): void {
    this.candidateExamItemsService.getCurrentQuestion();

    // this.getCurrentQuestion();
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentItemIndex;
    this.candidateExamDetails =
      this.candidateExamItemsService.candidateExamDetails;
    this.currentCandidate = this.candidateAccountService.getUser();
    this.isAssessmentOn = true;
    this.startTimer();
    this.startAutoSave();
  }
  nextQuestion(): void {
    this.candidateExamItemsService.nextQuestion();
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentItemIndex;
    // this.standandChoiceRef.getSelectedOptions()
  }

  previousQuestion(): void {
    this.candidateExamItemsService.previousQuestion();
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentItemIndex;
    // this.standandChoiceRef.getSelectedOptions()
  }


  confirm(): void {
    Swal.fire({
      title: "Are you sure you want to end this exam?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(3, 142, 220)",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Yes, end exam!",
    }).then((result) => {
      if (result.value) {

        this.endExam();
        Swal.fire({
          title: "Exam submitted!",
          text: "You have submitted successfully.",
          confirmButtonColor: "rgb(3, 142, 220)",
          icon: "success",
        });
        
      }
    });
  }

  endExam(): void {

    this.candidateExamService
    .endExam(this.candidateExamDetails.procedureId, true, this.generatePayload())
    .subscribe(
      {
        next: (value) =>{
          
        },
        error: (err: HttpErrorResponse)=> {
          console.log(err.error.messge)
        },
        complete:()=> {
          this.ngOnDestroy();
          this.router.navigate(["candidate/end-exam"]);
        },
      }
    )
    
  }

  ngOnDestroy(): void {
    this.timerSub.unsubscribe();
    this.autoSaveSub$.unsubscribe()
    // console.log("i have been destroyed");
  }

  

  // getCurrentQuestionResponse(item: CandidateProcedureItem) {
  //   console.log(item);
  // }

  startTimer() {
    this.timerSub$ = timer(1000, 1000).subscribe((value) => {
      if (this.candidateExamDetails.seconds == 0) {
        --this.candidateExamDetails.minute;
        this.candidateExamDetails.seconds = 59;

        /* if(this.candidateToGrade.candidateDetails.minute  != 0){
                
                -- this.candidateToGrade.candidateDetails.minute;
            }*/
      } else {
        --this.candidateExamDetails.seconds;
      }

      if (
        this.candidateExamDetails.minute == 0 &&
        this.candidateExamDetails.seconds == 0
      ) {
        // end exam and cancel subscription
        this.endExam()
        Swal.fire({
          title: "Exam submitted!",
          text: "You ran out of time.",
          confirmButtonColor: "rgb(3, 142, 220)",
          icon: "success",
        });
        
        return;
      }
    });
  }

  displayTimerText(): string {
    let minute = this.candidateExamDetails.minute;
    let seconds = this.candidateExamDetails.seconds;

    let minuteText = minute < 10 ? "0" + minute : "" + minute;
    let secondsText = seconds < 10 ? "0" + seconds : "" + seconds;

    return minuteText + " : " + secondsText;
  }

  useShortcut(): void {
    if (this.currentQuestionNumber != 0) {
      switch (this.keyPressed.toLowerCase()) {
        case "p":
          this.previousQuestion();
          break;
      }
    }
    if (this.currentQuestionNumber + 1 != this.itemsLength) {
      switch (this.keyPressed.toLowerCase()) {
        case "n":
          this.nextQuestion();
          break;
      }
    }
  }

  autoSave() {
    this.candidateExamService
      .autoSaveCandidateExam(
        this.candidateExamDetails.procedureId,
        this.generatePayload()
      )
      .subscribe({
        next: (value) => {},
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      });
  }

  startAutoSave() {
    if (!this.isAssessmentOn) {
      return;
    }

    this.autoSaveSub$ = timer(60 * 1000, 60 * 1000).subscribe((value) => {
      this.autoSave();
    });
  }

  generatePayload(): CandidateResponseDTO {
    let payload = {
      minute: this.candidateExamDetails.minute,
      seconds: this.candidateExamDetails.seconds,
      detailsId: this.candidateExamDetails.examDetailsId,
      responsesId: this.candidateExamDetails.responsesId,
      responseSet: this.standandChoiceRef.getSelectedOptions(),
    };

    return payload;
  }

  // displayEndExamButton(): boolean{
   
  //   let candidateTotalResponses = this.candidateExamItemsService.candidateExamDetails.candidateProcedureItems.length;
  //   let itemsLength = this.candidateExamDetails.candidateProcedureItems.length

  //   if( (candidateTotalResponses / itemsLength) * 100 >= 50){
  //     return true
  //   }
  //   return false
  // }
}
