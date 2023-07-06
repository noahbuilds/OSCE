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
  CandidateResponse,
  CandidateResponseDTO,
} from "../models/candidate";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";
import { CandidateAccount } from "src/app/authentication/model/candidate-account";
import { CandidateExamService } from "../services/candidate-exam.service";
import { HttpErrorResponse } from "@angular/common/http";
import { StandardChoiceComponent } from "./standard-choice/standard-choice.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { UtilitiesService } from "../services/utilities.service";
import { PassportService } from "../services/passport.service";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.scss"],
})
export class ExamPageComponent implements OnInit, OnDestroy {

  currentQuestionNumber: number = 0;
  currentQuestion: CandidateProcedureItem;
  itemsLength: number;
  keyPressed: string = "";
  shortcutKeys: string[] = ["a", "b", "c", "d"];
  attemptedQuestions: CandidateResponse[] = [];
  candidateExamDetails: CandidateModel;
  currentCandidate: CandidateAccount;
  isAssessmentOn: boolean = false;
  autoSaveSub$: Subscription;
  timerSub$: Subscription;
  questionIDs: Array<string> = [];
  examEnded: boolean = false;
  endExamTimerSub$: Subscription;
  processingEndExam: boolean = false;
  image: any = null


  @ViewChild(StandardChoiceComponent)
  standandChoiceRef!: StandardChoiceComponent;

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyPressed = event.key;
    this.useShortcut();
  }
  constructor(
    private router: Router,
    private candidateExamItemsService: CandidateExamItemsService,
    private candidateAccountService: CandidateAccountService,
    private candidateExamService: CandidateExamService,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private utilitiesService: UtilitiesService,
    private passportService: PassportService
  ) {}

  ngOnInit(): void {
    this.candidateExamItemsService.getCurrentQuestion();

    this.currentQuestionNumber =
      this.candidateExamItemsService.currentQuestion.currentQuestionNumber;

    this.candidateExamDetails =
      this.candidateExamItemsService.candidateExamDetails;

    this.currentCandidate = this.candidateAccountService.getUser();

    this.isAssessmentOn = true;

    this.startTimer();
    // this.startAutoSave();

    this.candidateExamItemsService
      .getCandidateProcedureItems()
      .forEach((element) => {
        this.questionIDs.push(element.itemId);
      });
    this.itemsLength = this.questionIDs.length;
  this.attemptedQuestions = this.candidateExamItemsService.getSavedResponses()
    
  this.fetchImage(this.candidateAccountService.getUser().examNumber)
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



  nextQuestion(): void {
    this.candidateExamItemsService.nextQuestion();
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentQuestion.currentQuestionNumber;
    this.attemptedQuestions = this.standandChoiceRef.getSelectedOptions();
  }

  previousQuestion(): void {
    this.candidateExamItemsService.previousQuestion();
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentQuestion.currentQuestionNumber;
    this.attemptedQuestions = this.standandChoiceRef.getSelectedOptions();
  }

  
 
  


 

  endExam(timedOut: boolean): void {
    this.processingEndExam = true;
    if(this.timerSub$ != null){
      this.timerSub$.unsubscribe();
    }
    
    // this.autoSaveSub$.unsubscribe();
    this.isAssessmentOn = false

    this.candidateExamService
      .endExam(
        this.candidateExamDetails.procedureId,
        timedOut,
        this.generatePayload()
      )
      .subscribe({
        next: (value) => {
          Swal.close()
          this.utilitiesService.isExamStarted = false
          this.utilitiesService.isExamEnded = true
          this.candidateExamItemsService.savedResponses = []
          this.attemptedQuestions = []
          
          this.router.navigate(["candidate/end-exam"]);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.messge);
          this.processingEndExam = false;
        },
        complete: () => {
          if(this.endExamTimerSub$ != null){
            this.endExamTimerSub$.unsubscribe();
          }
          this.processingEndExam = false;

        //  this.displayWarningTimer = false
          
          
        },
      });
  }

 

  startTimer() {
    this.timerSub$ = timer(1000, 1000).subscribe((value) => {
      if (this.examEnded) {
        return;
      }
      if (this.candidateExamDetails.seconds == 0) {
        --this.candidateExamDetails.minute;
        this.candidateExamDetails.seconds = 59;

        /* if(this.candidateToGrade.candidateDetails.minute  != 0){
                
                -- this.candidateToGrade.candidateDetails.minute;
            }*/
      } else {
        --this.candidateExamDetails.seconds;
      }

      this.checkForWarning()

      

      if (
        this.candidateExamDetails.minute == 0 &&
        this.candidateExamDetails.seconds == 0
      ) {
        // end exam and cancel subscription
        this.examEnded = true;
        this.endExam(true);

        if (this.processingEndExam == true) {
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
        } else {
          Swal.fire({
            title: "Exam submitted!",
            text: "You ran out of time.",
            confirmButtonColor: "rgb(3, 142, 220)",
            icon: "success",
          });
        }


        

        //return;
      }

      if( this.candidateExamDetails.seconds % 30 == 0){
        this.autoSave()
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

  checkForWarning(){
  
    if((this.candidateExamDetails.minute == 3) &&
     (this.candidateExamDetails.seconds == 0 )){
      this.displayWarning('You have used 7 minutes for this assessment');
     
      
    }
    if((this.candidateExamDetails.minute == 2) && 
    (this.candidateExamDetails.seconds == 0 )){

      
    
      this.displayWarning('You have used 8 minutes for this assessment');
    
    }
    if((this.candidateExamDetails.minute == 1) &&
     (this.candidateExamDetails.seconds == 0 )){

      
      this.displayWarning('You have used 9 minutes for this assessment');
      
    }
  }

  displayWarning(message: string) {
    // this.displayWarningTimer = true
    this.notifierService.notify(
      "error",
      message
    );
    this.playAudio()

}

startWarningTimerAnimation(): boolean{
  if((this.candidateExamDetails.minute <= 3  && this.candidateExamDetails.minute >= 0) 
  && (this.candidateExamDetails.seconds >= 0 && this.candidateExamDetails.seconds <= 59)){
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

  useShortcut(): void {
    // for (let i = 0; i < this.shortcutKeys.length; i++) {
    //   switch (this.keyPressed.toLowerCase()) {
    //     case `${this.shortcutKeys[i]}`:
    //       this.candidateExamItemsService.currentQuestion.selectedOption =
    //         this.candidateExamItemsService.currentQuestion.options[`${i}`].id;
    //       //  console.log( this.candidateExamItemsService.currentQuestion.options)
        
    //       this.standandChoiceRef.captureResponse(
    //         this.candidateExamItemsService.currentQuestion.options[`${i}`].id,
    //         this.candidateExamItemsService.currentQuestion.itemId
    //       );
    //       break;
    //   }
    // }

    switch(this.keyPressed.toLowerCase()){
      case `a`:
        this.candidateExamItemsService.currentQuestion.selectedOption =
            this.candidateExamItemsService.currentQuestion.options[0].id;
            this.standandChoiceRef.captureResponse(
              this.candidateExamItemsService.currentQuestion.options[0].id,
              this.candidateExamItemsService.currentQuestion.itemId
            );
      break;
      case `b`:
        this.candidateExamItemsService.currentQuestion.selectedOption =
            this.candidateExamItemsService.currentQuestion.options[1].id;
            this.standandChoiceRef.captureResponse(
              this.candidateExamItemsService.currentQuestion.options[1].id,
              this.candidateExamItemsService.currentQuestion.itemId
            );
            break
            case `c`:
              this.candidateExamItemsService.currentQuestion.selectedOption =
                  this.candidateExamItemsService.currentQuestion.options[2].id;
                  this.standandChoiceRef.captureResponse(
                    this.candidateExamItemsService.currentQuestion.options[2].id,
                    this.candidateExamItemsService.currentQuestion.itemId
                  );
                  break
                  case `d`:
                    this.candidateExamItemsService.currentQuestion.selectedOption =
                        this.candidateExamItemsService.currentQuestion.options[3].id;
                        this.standandChoiceRef.captureResponse(
                          this.candidateExamItemsService.currentQuestion.options[3].id,
                          this.candidateExamItemsService.currentQuestion.itemId
                        );
                        break
                        
    }

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
          // console.log(err.status)
          if(err.status == 409){
            this.utilitiesService.isExamEnded = true
            this.router.navigate(['candidate/login'])
          }
          console.log(err.error.message);
        },
      });
  }

  // startAutoSave() {
  //   if (!this.isAssessmentOn) {
  //     return;
  //   }

  //   this.autoSaveSub$ = timer(30 * 1000, 30 * 1000).subscribe((value) => {
  //     this.autoSave();
  //   });
  // }

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

  navigator(index: number) {
    this.candidateExamItemsService.navigateTo(index);
    this.currentQuestionNumber =
      this.candidateExamItemsService.currentQuestion.currentQuestionNumber;
  }

  displayEndExamButton(): boolean {
    let candidateTotalResponses = this.attemptedQuestions.length;
    let itemsLength = this.candidateExamDetails.candidateProcedureItems.length;

    if ((candidateTotalResponses / itemsLength) * 100 >= 80) {
      return true;
    }
    return false;
  }

  openEndExamConfirmationDialog(modal:any){
         
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

  checkIfAttempted(itemId: string): string {
    var itemFound = this.attemptedQuestions.find(
      (item) => item.itemId == itemId
    );

    if (itemFound != null) {
      return "#25a0e2";
    }

    return "f5f7fa";
  }


  showExamEndingLoader(){
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



  ngOnDestroy(): void {
    if(this.timerSub$ != null){
      this.timerSub$.unsubscribe();
    }
    if(this.autoSaveSub$ != null){
      this.autoSaveSub$.unsubscribe();
    }
    
   if( this.endExamTimerSub$ != null){
    this.endExamTimerSub$.unsubscribe()
   }

    this.candidateExamDetails = null
    this.isAssessmentOn = false
    this.utilitiesService.isExamStarted = false
    // this.displayWarningTimer = false;
    this.candidateExamItemsService.savedResponses = []
    this.attemptedQuestions = []
    this.utilitiesService.isExamEnded = false
    // console.log("i have been destroyed");
  }
}
