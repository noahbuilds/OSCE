import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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


@Component({
  selector: "app-mark-procedure",
  templateUrl: "./mark-procedure.component.html",
  styleUrls: ["./mark-procedure.component.scss"],
})
export class MarkProcedureComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  isFound: boolean = false;
  procedures: Array<any> = [
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos ",
      grade: "",
      id: 1,
      maxScore: 1,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 2,
      maxScore: 0.5,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 3,
      maxScore: 0.25,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 4,
      maxScore: 1,
    },
  ];
  currentExaminer: ExaminerAccount;
  grades: any = ["0", "1/4", "1/2", 1];

  gradedDTO: any = [];
  gradedActivitiesId = [];
  candidateToGrade: ProcedureModel;
  candidateActivitiesLength: number;
  isAssessmentOn: boolean = false;
  timerSub$: Subscription;
  autoSaveSub$: Subscription;
  completedActivities = [];

  constructor(
    private modalService: NgbModal,
    private markProcedureService: MarkProcedureService,
    private examinerAccountService: ExaminerAccountService,
    private readonly notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Examiner" },
      { label: "Mark Procedure", active: true },
    ];

    this.getCurrentExaminer();
  }

  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openGrader(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  cancel() {
    this.modalService.dismissAll();
  }

  grader(index: number, grade: string) {
    if (grade === "1/4") {
      this.candidateToGrade.activities[index].score = 0.25;
    } else if (grade === "1/2") {
      this.candidateToGrade.activities[index].score = 0.5;
    } else if (grade === "3/4") {
      this.candidateToGrade.activities[index].score = 0.75;
    } else {
      this.candidateToGrade.activities[index].score = parseInt(grade);
    }

    console.log(this.candidateToGrade.activities[index]);
  }

  convertFractionToScore(fraction : string): number{
        
    if(fraction == "0"){
        
      return 0

    }
    else if (fraction == "1/2") {
      return 0.5
    }
    else if(fraction == "1/4"){
      return 0.25
    }
    else if( fraction == "3/4"){
      return 0.75
    }
    else {
      return 1
    }
    
  }

  setGradeList() {
    for (let i = 0; i < this.candidateToGrade.activities.length; i++) {
      this.candidateToGrade.activities[i].gradeList = [];
      if (this.candidateToGrade.activities[i].maxScore === 1) {
        this.candidateToGrade.activities[i].gradeList = [
          "0",
          "1/4",
          "1/2",
          "3/4",
          "1",
        ];
      } else if (this.candidateToGrade.activities[i].maxScore === 0.75) {
        this.candidateToGrade.activities[i].gradeList = [
          "0",
          "1/4",
          "1/2",
          "3/4",
        ];
      } else if (this.candidateToGrade.activities[i].maxScore === 0.5) {
        this.candidateToGrade.activities[i].gradeList = ["0", "1/4", "1/2"];
      } else {
        this.candidateToGrade.activities[i].gradeList = ["0", "1/4"];
      }
    }
  }
  // MRD
  getCandidateToGrade(
    examId: string,
    examinerId: string,
    programId: string,
    procedureId: string,
    examNumber: string
  ): Subscription {
    this.isFound = false;

    return this.markProcedureService
      .getCandidateToGrade(
        examId,
        examinerId,
        programId,
        procedureId,
        examNumber
      )
      .subscribe({
        next: (data: ProcedureModel) => {
          this.candidateToGrade = data;
          if(this.candidateToGrade.candidateDetails.activitiesScores == null){
            this.candidateToGrade.candidateDetails.activitiesScores = [];
          }
          this.isFound = true;
          this.setGradeList();
        },
        complete: () => {
          this.candidateActivitiesLength =
            this.candidateToGrade.activities.length;
          console.log(this.candidateToGrade);
        },
        error: (err: HttpErrorResponse) =>{
            this.notifierService.notify('error', err.error.message )
        },
      });
  }

  checkIfActivityAttempted(id: string, score: number) : boolean {
       
    var activity = this.candidateToGrade.candidateDetails.activitiesScores
                   .find((activity) => activity.activityId === id && activity.score == score);

   return  activity == null ? false : true;
  }

  startAutoSave() {
    if (!this.isAssessmentOn) {
      return;
    }

    this.autoSaveSub$ = timer(60 * 1000, 60 * 1000).subscribe((value) => {
      this.autoSaveCandidateProcedure(this.generatePayload());
    });
  }

  displayTimerText(): string {
    let minute = this.candidateToGrade.candidateDetails.minute;
    let seconds = this.candidateToGrade.candidateDetails.seconds;

    let minuteText = minute < 10 ? "0" + minute : "" + minute;
    let secondsText = seconds < 10 ? "0" + seconds : "" + seconds;

    return minuteText + " : " + secondsText;
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

      if (
        this.candidateToGrade.candidateDetails.minute == 0 &&
        this.candidateToGrade.candidateDetails.seconds == 0
      ) {
        // end exam and cancel subscription
        return;
      }
    });
  }

  startAssessment() {
    this.isAssessmentOn = true;
    this.startTimer();
    
    this.startAutoSave();
  }

  autoSaveCandidateProcedure(payload) {
    this.markProcedureService.autoSaveCandidateProcedure(payload).subscribe({
      next: (data: ResourceCreated) => {},
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  generatePayload(): CandidateGradedProcedureDTO {
    let candidateResponses: ActivityScore[] = [];

    this.candidateToGrade.activities.forEach((activity) => {
      let response: ActivityScore = {
        score: activity.score,
        activityId: activity.id,
      };

      candidateResponses.push(response);
    });

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
      activityScores: candidateResponses,
    };

    return payload;
  }
  
  endExam(timedOut: boolean) {
    this.timerSub$.unsubscribe();
    this.autoSaveSub$.unsubscribe();
    this.isAssessmentOn = false
    this.markProcedureService.candidateTimedOut(timedOut, this.generatePayload()).
    subscribe({
      next : (data)=>{
        console.log(data)
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.error.message)
      }
    });
  }

  getCurrentExaminer(): ExaminerAccount {
    (this.currentExaminer = this.examinerAccountService.getUser());
    return this.currentExaminer
  }

  
}
