import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ExamModel } from "../models/exam.model";
import { ExamService } from "../services/exam.service";
import { ManageExamService } from "../services/manage-exam.service";
import { NotifierService } from "angular-notifier";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import { DashboardService } from "../services/dashboard.service";

@Component({
  selector: "app-downloaded-exams",
  templateUrl: "./downloaded-exams.component.html",
  styleUrls: ["./downloaded-exams.component.scss"],
})
export class DownloadedExamsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  downloadedExams: ExamModel[];

  processingUploadOsce: boolean = false;
  processingUploadViva: boolean = false;
  processingUploadResearch: boolean = false;
  processingUploadExpectantCare: boolean = false;

  constructor(
    private router: Router,
    private examService: ExamService,
    private manageExamService: ManageExamService,
    private readonly notifierService: NotifierService,
    private managerAccountService: ManagerAccountService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Downloaded Exams", active: true },
    ];
    this.getDownloadedExams();
  }

  viewExaminers(examId: string, programId: string, programName: string) {
    this.router.navigate([
      "manager/downloaded-exams/details",
      programName,
      examId,
      programId,
    ]);
  }

  getDownloadedExams() {
    this.examService.getDownloadedExams().subscribe({
      next: (data: ExamModel[]) => {
        this.downloadedExams = data;
        // console.log(this.downloadedExams);
      },
    });
  }

  uploadOsce(examId: string) {
    this.processingUploadOsce = true
    this.manageExamService
      .uploadOsce(examId)
      .subscribe({
        next: (value) => {
          this.notifierService.notify("success", "OSCE uploaded successfully");
          this.processingUploadOsce = false
          this.getDownloadedExams()
        },
        error: (err: HttpErrorResponse) => {
          this.notifierService.notify("error", err.error.message);
          this.processingUploadOsce = false
        },
      });
  }

  uploadViva(examId: string) {
    this.processingUploadViva = true
    this.manageExamService
      .uploadViva(examId)
      .subscribe({
        next: (value) => {
          this.notifierService.notify("success", "VIVA uploaded successfully");
          this.processingUploadViva = false
          this.getDownloadedExams()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.notifierService.notify("error", err.error.message);
          this.processingUploadViva = false
        },
      });
  }

  uploadResearch(examId:string) {
    this.processingUploadResearch = true
    this.manageExamService
      .uploadResearch(examId)
      .subscribe({
        next: (value) => {
          this.notifierService.notify(
            "success",
            "RESEARCH uploaded successfully"
          );
          this.processingUploadResearch = false
          this.getDownloadedExams()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.notifierService.notify("error", err.error.message);
          this.processingUploadResearch = false
        },
      });
  }

  uploadExpectantCare(examId: string) {
    this.processingUploadExpectantCare = true
    this.manageExamService
      .uploadExpectantCare(examId)
      .subscribe({
        next: (value) => {
          this.notifierService.notify(
            "success",
            "CLIENT CARE uploaded successfully"
          );
          this.processingUploadExpectantCare = false
          this.getDownloadedExams()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.notifierService.notify("error", err.error.message);
          this.processingUploadExpectantCare = false
        },
      });
  }
}
