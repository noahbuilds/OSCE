import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { ExaminerAccountService } from "src/app/authentication/services/examiner-account.service";
import { ResourceCreated } from "../../exam-manager/models/resource.created";
import { HttpErrorResponse } from "@angular/common/http";
import { ExaminerAccount } from "src/app/authentication/model/examiner-account";
import { ExpectantCareCandidateModel } from "../models/candidate.model";
import { MarkExpectantCareService } from "../services/mark-expectant-care.service";
import { Status } from "src/app/shared/enum/status";
import { PassportService } from "../services/passport.service";

@Component({
  selector: "app-mark-expectant-care",
  templateUrl: "./mark-expectant-care.component.html",
  styleUrls: ["./mark-expectant-care.component.scss"],
})
export class MarkExpectantCareComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  candidateToGrade: ExpectantCareCandidateModel;
  gradedCandidatesByProgram: ExpectantCareCandidateModel[] = [];
  currentExaminerData: ExaminerAccount;
  resourceCreated: ResourceCreated;
  successfullyGradedCount: number = 0;
  candidateStatus = Status;
  processingSearch: boolean = false;
  image: any = null;
  gradingCandidate: boolean = false;

  constructor(
    private modalService: NgbModal,
    private examinerAccountService: ExaminerAccountService,
    private readonly notifierService: NotifierService,
    private markExpectantCareService: MarkExpectantCareService,
    private passportService: PassportService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Examiner" },
      { label: "Mark Expectant care", active: true },
    ];

    this.currentExaminerData = this.examinerAccountService.getUser();
    this.getGradedCandidatesByProgram(this.currentExaminerData.programId);
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

  getCandidateForGrading(examNumber: string, programId: string, content: any) {
    this.processingSearch = true;
    if (examNumber == "") {
      this.notifierService.notify(
        "error",
        "Please enter candidate exam number"
      );

      return;
    }
    this.markExpectantCareService
      .getCandidateForGrading(examNumber, programId)
      .subscribe({
        next: (data: ExpectantCareCandidateModel) => {
          this.candidateToGrade = data;
          this.processingSearch = false;
          this.fetchImage(examNumber);
        },
        complete: () => {
          this.openGrader(content);
          if (this.candidateToGrade.vivaScoreId != null) {
            this.notifierService.notify(
              "error",
              `${this.candidateToGrade.name} has already been graded`
            );
          }
        },
        error: (err: HttpErrorResponse) => {
          this.notifierService.notify("error", err.error.message);
          this.processingSearch = false;
        },
      });
  }

  fetchImage(examNumber: string) {
    // console.log("about fetching",'/image/fetch/'+regNumber);

    examNumber = examNumber.toLocaleUpperCase();

    this.passportService.getPassport("/image/fetch/" + examNumber).subscribe(
      (data) => {
        // this.image =  data;
        this.createImageFromBlob(data);
        //   console.log(data, "this is data");
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.image = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getGradedCandidatesByProgram(programId: string) {
    this.successfullyGradedCount = 0;

    this.markExpectantCareService
      .getGradedCandidatesByProgram(programId)
      .subscribe({
        next: (data) => {
          this.gradedCandidatesByProgram = data;
          this.getCandidateStatus();
        },
        complete: () => {
          this.gradedCandidatesByProgram.forEach((candidate) => {
            if (candidate.stamp != null) {
              ++this.successfullyGradedCount;
            }
          });
        },
      });
  }

  getCandidateStatus() {
    this.gradedCandidatesByProgram.forEach((candidate) => {
      if (candidate.stamp != null) {
        candidate.status = Status.COMPLETED;
      } else {
        candidate.status = Status.PENDING;
      }
    });
  }

  gradeCandidate(candidateId: string, grade: string) {
    this.gradingCandidate = true;
    if (parseFloat(grade) > this.candidateToGrade.maxClientCareScore) {
      this.notifierService.notify(
        "error",
        `Score cannot be more than ${this.candidateToGrade.maxClientCareScore}`
      );
      this.gradingCandidate = false;
      return;
    }
    let payload = {
      candidateId: candidateId,
      score: parseFloat(grade),
      examinerId: this.currentExaminerData.id,
      programId: this.currentExaminerData.programId,
      examId: this.currentExaminerData.examId,
    };
    this.markExpectantCareService
      .gradeCandidate(candidateId, payload)
      .subscribe({
        next: (data: ResourceCreated) => {
          this.resourceCreated = data;
          this.getGradedCandidatesByProgram(payload.programId);
          this.gradingCandidate = false;
        },
        error: (err: HttpErrorResponse) => {
          this.notifierService.notify("error", err.error.message);
          console.log(err.error.message);
          this.gradingCandidate = false;
        },
        complete: () => {
          this.modalService.dismissAll();
          this.notifierService.notify(
            "success",
            "candidate graded successfully"
          );
        },
      });
  }
}
